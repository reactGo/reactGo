## Heroku로 시작하기

Heroku
```bash
heroku create

# 헤로쿠에 배포하기
git push heroku master

# 헤로쿠 MYSQL 데이터베이스
heroku addons:create cleardb
# 몽고DB를 쓰기 위해서는 MongoDB atlas를 사용해야 합니다.

# 선택 사항:

# 필요하면 앱 이름을 바꿀 수 있습니다.
heroku apps:rename <새 이름>

# 배포된 앱을 확인하세요.
heroku open

```

참고:

1. 다른 컴퓨터로 일할 때 `heroku does not appear to be a remote repository` 메시지를 본다면, `git remote add heroku git@heroku.com:앱이름.git`를 입력하세요.
2. Heroku와 로컬 환경에 구글 인증을 설정하길 원한다면 FAQ를 참조하세요.
