1. 로컬 환경이나 Heroku에서 구글 인증이 안 돼요!
	1. [구글의 공식문서](https://developers.google.com/identity/protocols/OpenIDConnect) 를 따라 [Google Developers 콘솔](https://console.developers.google.com/) 에서 API 키를 생성하세요.
	2. API & 인증 메뉴에서 Client ID와 Client Secret을 복사하세요.

**로컬 환경**

- 로컬 환경에서 구글 인증이 돌아가려면, 서버 시작 전에 다음 환경 변수를 설정해야 합니다.

```bash
export GOOGLE_CLIENTID=복사한_CLIENTID
export GOOGLE_SECRET=복사한_SECRET
```

**Heroku**

- Heroku의 경우는 [여기에](https://devcenter.heroku.com/articles/config-vars) 환경 변수 설정법에 대해 나와 있습니다.

```bash
heroku config:set GOOGLE_CLIENTID=YOUR_CLIENTID
heroku config:set GOOGLE_SECRET=YOUR_SECRET
heroku config:set GOOGLE_CALLBACK=YOUR_CALLBACK
```
