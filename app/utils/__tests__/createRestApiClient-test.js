import express from 'express';
import bodyParser from 'body-parser';
import expect from 'expect';
import createRestApiClient from '../createRestApiClient';

const apiServer = () => {
  const app = express();
  app.use(bodyParser.json());

  app.use('*', (req, res) => {
    res.send({
      method: req.method,
      query: req.query,
      body: req.body
    });
  });

  const server = app.listen(3001, () => {});

  return {
    close: () => server.close()
  };
};

describe('RESTful api client', () => {
  let client;
  let server;
  const apiEndpoint = 'http://localhost:3001';

  beforeEach(() => {
    client = createRestApiClient().withConfig({ baseUrl: apiEndpoint });

    server = apiServer('/test');
  });

  afterEach(() => {
    server.close();
  });

  describe('makeRequest() to endpoint', () => {
    let request;
    const method = 'POST';
    const params = { id: '123' };
    const data = { name: 'kending' };

    beforeEach(() => {
      request = client.request({
        url: '/test',
        method,
        params,
        data
      });
    });

    it('should have specified method in request', done => {
      request.then(response => {
        expect(response.data.method).toEqual(method);
        return done();
      });
    });

    it('should contain specified query params in request', done => {
      request.then(response => {
        expect(response.data.query).toEqual({ id: '123' });
        return done();
      });
    });

    it('should contain data send with request in request', done => {
      request.then(response => {
        expect(response.data.body).toEqual({ name: 'kending' });
        return done();
      });
    });
  });
});
