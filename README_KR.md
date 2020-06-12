# reactGo

[![Dependency Status][dep-status-img]][dep-status-link] [![devDependency Status][dev-dep-status-img]][dev-dep-status-link]
[![Gitter][gitter-img]][gitter-link] [![npm version][npm-badge]][npm-link]

[EN Doc](https://github.com/reactGo/reactGo/blob/master/README.md)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

> ES2015, React와 Redux, Redux Thunk, React Router, Hot reloading, Emotion, Express 4.x, 그리고 다양한 ORM과 함께 풀스택 앱을 개발하세요! :rocket:

[dep-status-img]: https://david-dm.org/choonkending/react-webpack-node.svg
[dep-status-link]: https://david-dm.org/choonkending/react-webpack-node
[dev-dep-status-img]: https://david-dm.org/choonkending/react-webpack-node/dev-status.svg
[dev-dep-status-link]: https://david-dm.org/choonkending/react-webpack-node#info=devDependencies
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-link]: https://gitter.im/choonkending/react-webpack-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[npm-badge]: https://badge.fury.io/js/react-webpack-node.svg
[npm-link]: http://badge.fury.io/js/react-webpack-node


#### 데모 사이트: [**https://demo-reactgo.herokuapp.com/**](https://demo-reactgo.herokuapp.com/)

## 주요 기능:
- ~~isomorphic~~ [**유니버셜**](https://medium.com/@ghengeveld/isomorphism-vs-universal-javascript-4b47fb481beb#.4x2t3jlmx) 렌더링
- [**Redux**](https://github.com/reactjs/redux) 예측 가능한 상태 컨테이너.
- 비동기 액션 dispatch를 위한 [**Redux Thunk**](https://github.com/reduxjs/redux-thunk).
- [**React Router**](https://github.com/reactjs/react-router) 5.x로 서버사이드렌더링(SSR)하기. 서버사이드렌더링을 하면 사용자(또는 검색엔진 봇)가 페이지를 요청했을 때 컴포넌트의 초기 상태값을 미리 렌더링할 수 있습니다.
- [**Connected React Router**](https://github.com/supasate/connected-react-router) 로 리덕스와 리액트 라우터 연결하기
- 서버사이드렌더링(SSR) 시 비동기로 데이터 가져오기
- 서버 사이드 인증 + 컴포넌트로 리다이렉트
- [**hot-loader/react-dom**](https://github.com/hot-loader/react-dom) 을 사용해서 핫 리로딩
- [**Redux-Devtools Chrome Extension**](https://github.com/zalmoxisus/redux-devtools-extension) 을 사용한 타임머신 기능
- 개발 및 배포 시 [**Webpack 4**](https://github.com/webpack/webpack) 를 사용합니다. 개인적으로 JS, CSS, LESS, images 등등을 번들링할 때 최고라고 생각해요!
- CSS-in-JS를 위한 [**emotion**](https://emotion.sh/docs/introduction) . (대부분의) CSS 충돌과 글로벌 스코프 문제는 이제 안녕~

- jsdom, mocha, sinon & enzyme을 사용한 **유닛 테스트**
	- 리듀서
	- 컴포넌트 ([Enzyme](http://airbnb.io/enzyme))
	- 동기 및 비동기 액션들

- 수십 개의 미들웨어를 사용한 Express4.x 서버
- 몽고DB를 위한 몽구스 ODM
- 포스트그레SQL과 MySQL을 위한 시퀄라이즈 ORM
- Heroku에 배포하기 위한 Procfile & Salt 설정에 대한 문서 + Digital Ocean에 배포하기


## 만든 동기

이걸 만들게 된 동기는 간단합니다! 최고의 실전 사례를 모아두고 환상적인 개발 경험(DX)을 제공하기 위해서죠. 우리의 궁극적인 목표는 안전하고, 빠르고, 버그가 없는 대규모 애플리케이션을 제작하기 위한 보일러플레이트를 제공하는 것입니다.

reactGo는 대규모 React 애플리케이션 제작을 어떻게 하는지 관심 있어하는 사람에게는 최고의 학습 도구가 되고, 빠르게 최신 버전의 설정 습득을 원하는 사람에게는 좋은 보일러플레이트가 될 것입니다.

저희는 실전 사례가 발전함에 따라 다양한 커뮤니티의 의견들을 이 보일러플레이트에 포함했고, 지금도 항상 새로운 아이디어나 기여를 귀기울여 듣고 있습니다.

## 왜 Redux인가

저희는 상태 관리를 위한 Flux 패턴의 구현체인 Redux를 정말로 좋아합니다. Redux의 주요 원칙은:
- 하나의 스토어
- 읽기 전용인 상태값 (액션을 만들어야만 상태를 바꿀 수 있음)
- 순수함수들로 작성된 상태변경 액션

위 원칙들은 **예측 가능한** 코드를 정말 쉽고 재밌게 만들 수 있게 해줍니다! 그밖에 많은 이유들이 있지만, 그냥 [Redux 공식문서](http://redux.js.org/index.html) 를 보시는 게 나을 거에요!

만약 여러분이 리덕스 창시자가 제작한 무료 Egghead 강좌 시리즈를 선호하는 **동영상 강좌 애청자**라면:

1. [시작하기](https://egghead.io/series/getting-started-with-redux)
2. [리덕스로 리액트 애플리케이션 제작하기](https://egghead.io/series/building-react-applications-with-idiomatic-redux)

#### 데이터 흐름

서버로부터 클라이언트까지의 데이터 흐름을 간단하게 묘사하자면:

```
Express의 app.use()가 요청을 받습니다.
-> 미리 웹팩으로 빌드된 서버 파일을 호출합니다.
-> 서버의 React Router(react-router-config와 함께)를 통해 매칭되는 라우트를 찾습니다.
-> 비동기 데이터 가져오기 요청을 합니다.
-> 라우트 컴포넌트를 문자열로 만듭니다.
-> HTML 파일로 만듭니다(Meta, Link 태그는 helmet을 사용해서 넣어줍니다)
-> 브라우저는 초기 상태값이 포함된 HTML 문자열을 받습니다.
-> 이 때 클라이언트측 React가 등장해 초기 상태값을 적용합니다.
-> 그 상태값에서부터 시작합니다.
-> 모두가 행복합니다 :)
```

#### Redux 데브툴(개발자 도구)

[여기서](https://github.com/zalmoxisus/redux-devtools-extension) redux devtools extension을 설치하시면 모든게 알아서 작동할 거에요!

## 알아두어야할 것

#### Database

We currently support MongoDB, MySQL and Postgres, as well as the ability to not use any database. [Learn](docs/databases.md) about how to configure your app.

#### Development

Development is a breeze. Once you have installed all your dependencies all the configuration is done for you. using simple The process is outlined [here](docs/development.md).

#### Building the application

```bash
# Build the application for development
npm run build

# Build the application for production
npm run build:dev
```

#### Running the application

```bash
# Run in development mode (with hot-reloading)
npm run dev

# Run in production mode
npm start
```

#### Unit Tests

Testing with:
- `mocha` as the test framework
	- We find all the files we need that have a `-test.js` suffix in the `/app` directory.
- `jsdom` as my test environment

```bash
# Run test once
npm test

# Run in watch mode
npm test:watch
```

We have unit tests for async (redux) actions, reducers, and stateless components with [enzyme](http://airbnb.io/enzyme).

#### Deployment

Currently we support [Heroku](docs/deployment/Heroku.md) and [Digital Ocean](docs/deployment/DigitalOcean.md) and [AWS](docs/deployment/aws.md)

#### Roadmap
We have an outline of our roadmap [here](https://github.com/reactGo/reactGo/blob/master/Roadmap.md)

## Yeoman Generator
If you like using yeoman generators, you could check out [this](https://github.com/iiegor/generator-react-webpack-node) cool yeoman generator by @iiegor!

## FAQ

We have assembled an FAQ [here](/docs/FAQ.md)

## Check out what people have done

We have a [list](/docs/apps.md) of projects that have been created with this boilerplate. Check
them out to see what can be done or to get some inspiration.

## How to Contribute:

Best way to keep up to date is check the [issues](https://github.com/choonkending/react-webpack-node/issues). I really welcome improvements for **all aspects** of an app.

1. Any suggestions/improvements/bugs can be in the form of Pull Requests, or creating an issue.
2. Coding guidelines:
 - [Airbnb's Style Guide](https://github.com/airbnb/javascript)
 - [bendc's frontend guidelines](https://github.com/bendc/frontend-guidelines)


Credits to [webpack-server-side-example](https://github.com/webpack/react-webpack-server-side-example), [example-app](https://github.com/webpack/example-app), [flux-examples](https://github.com/facebook/flux/tree/master/examples), [node-express-mongo-demo](https://github.com/madhums/node-express-mongoose-demo), [hackathon-starter](https://github.com/sahat/hackathon-starter/), [web-starter-kit](https://github.com/google/web-starter-kit), [awesome material-ui](https://github.com/callemall/material-ui), [alt and iso](https://github.com/goatslacker/iso/tree/master/examples/react-router-flux), [react-starter](https://github.com/webpack/react-starter), [reap](https://github.com/choonkending/reap), [isomorphic-redux-app](https://github.com/caljrimmer/isomorphic-redux-app) and [mxstbr/react-boilerplate](https://github.com/mxstbr/react-boilerplate/blob/master/README.md)

**Easter Eggs** :egg:

This boilerplate has gone through an evolution
```
React.js -> Facebook Flux -> Alt -> Redux
```

We have two implementations of universal flux:
- **Redux** is on our active **master** branch
- [**Alt**](https://github.com/goatslacker/alt) (previously implemented) on [flux/alt](https://github.com/choonkending/react-webpack-node/tree/flux/alt) branch. It features [iso](https://github.com/goatslacker/iso), react-router and ImmutableJS.

> Note: If you have previously used an alt implementation of this repository, please refer to this branch. I will not be updating it as frequently as master, but definitely welcome suggestions!

License
===============
MIT
