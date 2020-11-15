# reactGo

[![Dependency Status][dep-status-img]][dep-status-link]
[![Gitter][gitter-img]][gitter-link] [![npm version][npm-badge]][npm-link]

[EN Doc](https://github.com/reactGo/reactGo/blob/master/README.md)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

> ES2015, React와 Redux, Redux Thunk, React Router, Hot reloading, Emotion, Express 4.x, 그리고 다양한 ORM과 함께 풀스택 앱을 개발하세요! :rocket:

_(구)choonkending/react-webpack-node_

[dep-status-img]: https://img.shields.io/librariesio/release/npm/@reactgo/cli
[dep-status-link]: https://david-dm.org/@reactgo/cli
[gitter-img]: https://badges.gitter.im/Join%20Chat.svg
[gitter-link]: https://gitter.im/choonkending/react-webpack-node?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge
[npm-badge]: https://badge.fury.io/js/%40reactgo%2Fcli.svg
[npm-link]: http://badge.fury.io/js/%40reactgo%2Fcli


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
- 개발 및 배포 시 [**Webpack 5**](https://github.com/webpack/webpack) 를 사용합니다. 개인적으로 JS, CSS, LESS, images 등등을 번들링할 때 최고라고 생각해요!
- CSS-in-JS를 위한 [**emotion**](https://emotion.sh/docs/introduction) . (대부분의) CSS 충돌과 글로벌 스코프 문제는 이제 안녕~

- jsdom, mocha, sinon & enzyme을 사용한 **유닛 테스트**
	- 리듀서
	- 컴포넌트 ([Enzyme](http://airbnb.io/enzyme))
	- 동기 및 비동기 액션들

- 수십 개의 미들웨어를 사용한 Express4.x 서버
- 몽고DB를 위한 몽구스 ODM
- 포스트그레SQL또는 MySQL을 위한 시퀄라이즈 ORM
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

#### 데이터베이스

우리는 현재 몽고DB와 MySQL, 포스트그레SQL을 지원합니다. 데이터베이스를 아무것도 안 써도 됩니다.

#### 개발하기

개발 환경을 구축하기 위해선 ReactGo CLI를 먼저 설치해야 합니다.

```bash
# ReactGo CLI를 먼저 설치합니다.
# 터미널 경로가 ReactGo 폴더에 있어야 합니다.
npm i -g
# 설치 완료 후 ReactGo를 복사할 폴더로 이동해주세요.
cd /당신이/복사하고자/하는/어딘가
# CLI를 실행하고 원하는 개발 스택을 선택하세요.
reactgo
``` 

#### 앱 빌드하기

```bash
# 개발 모드로 빌드하기
npm run build

# 배포 모드로 빌드하기
npm run build:dev
```

#### 애플리케이션 실행하기

```bash
# 개발 모드로 실행하기
npm run dev

# 배포 모드로 실행하기
npm start
```

#### 유닛 테스트

다음으로 테스트합니다:
- 테스트 프레임워크로는 `mocha`
	- `/app` 디렉토리 안에 `-test.js`로 끝나는 모든 파일들이 테스트 대상입니다.
- 테스트 환경으로는 `jsdom`

```bash
# 한 번만 실행하기
npm test

# watch 모드로 실행하기
npm test:watch
```

우리는 비동기 (리덕스) 액션들과, 리듀서, 상태가 없는 컴포넌트에 대한 유닛 테스트를 [enzyme](http://airbnb.io/enzyme) 으로 작성해두었습니다.

#### 배포

우리는 [Heroku](docs/deployment/Heroku_KO.md)와 [AWS](docs/deployment/aws_KO.md)를 지원합니다.

## reactGo로 만들어진 앱들

우리는 이 보일러플레이트를 사용해 만든 프로젝트들의 [리스트](/docs/apps.md) 를 갖고 있습니다. 이걸로 뭘 할 수 있는지 알아보거나 영감을 얻고 싶다면 눌러보세요.

## 기여하는 방법:

최신 진행 사항을 파악하려면 [이슈](https://github.com/reactGo/reactGo/issues) 들을 체크해보는 게 제일 좋습니다. 앱에 대해 **어떤 점이든 상관없이** 개선 사항이 있다면 환영합니다.

1. 어떠한 제안/개선사항/버그 제보도 괜찮으니 풀리퀘스트나 이슈로 알려주세요.
2. 코딩 가이드라인:
 - [Airbnb 스타일 가이드](https://github.com/airbnb/javascript)
 - [bendc의 프런트엔드 가이드라인](https://github.com/bendc/frontend-guidelines)
3. 코드를 변경하고 PR를 하려면, 다음 명령어대로 프로젝트를 설정해야 합니다.
```bash
# ReactGo CLI를 먼저 설치합니다.
# 터미널 경로가 ReactGo 폴더에 있어야 합니다.
npm i -g
# CLI를 실행하고 수정하길 원하는 스택을 선택하세요.
reactgo -d
# app과 server 폴더가 당신이 선택한 스택으로부터 바로가기로 생성됩니다.
# 원하는 모든 것을 바꿔도 됩니다. 하지만 app과 server 폴더는 건드리지 마세요. 걔네들은 그냥 바로가기일 뿐이니까요.
# 다 한 후에는 commit 후 push하세요.
``` 

**이스터에그** :egg:

이 보일러플레이트는 다음과 같은 진화 과정을 거쳤습니다.
```
React.js -> Facebook Flux -> Alt -> Redux(thunk -> saga -> toolkit)
                                 -> MobX(mobx 브랜치에 있음)
```

라이선스
===============
MIT
