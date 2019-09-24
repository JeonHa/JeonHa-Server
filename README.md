# JeonHa(전하)

> 2019 서울시 앱 공모전 출품작
>
> 한국의 전통 문화 강좌와 한옥 스테이를 알려주고 예약을 도와주는 서비스

![node_badge](https://img.shields.io/badge/node-%3E%3D%208.0.0-green)
![issue_badge](https://img.shields.io/github/issues/JeonHa/JeonHa-Server)
![license_badge](https://img.shields.io/github/license/JeonHa/JeonHa-Server)
![npm_bedge](https://img.shields.io/badge/npm-v6.10.1-blue)

* 프로젝트 기간: 2019.09.18 ~
* [API](https://github.com/JeonHa/JeonHa-Server/wiki) 




## 프로젝트 설명





## 논리적 DB 모델링

![ERD](https://github.com/JeonHa/JeonHa-Server/blob/master/public/images/ERD.png)





## 의존성

```json
{
  "dependencies": {
    "cookie-parser": "~1.4.3",
    "debug": "~2.6.9",
    "express": "~4.16.0",
    "http-errors": "~1.6.2",
    "jade": "~1.11.0",
    "jsonwebtoken": "^8.5.1",
    "morgan": "~1.9.0",
    "promise-mysql": "^4.1.0"
  }
}
```





## 시작하기

소스 코드는 MAC OS + Windows10 + Visiau Studio Code + Node v11.6.0 + NPM v6.10.1환경에서 제작되었습니다.

* Node.js의 Async/Await 도구를 사용해 (Promise) 비동기 제어를 하고 있습니다.



#### 설치하기

* `nodejs`와 `npm`을 을치합니다. (설치 방법 :  [nodejs.org](https://nodejs.org/) 를 참고)
* Node.js 10 LTS 버전을 설치합니다.
* 실행에 필요한 의존성을 설치합니다.

```
npm install
```



#### 실행하기

```
npm start
```

> localhost:1810으로 접속 가능합니다.



## 배포

* [AWS EC2](https://aws.amazon.com/ko/ec2/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_ec2_b&sc_content=ec2_e&sc_detail=aws ec2&sc_category=ec2&sc_segment=177228231544&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177228231544!e!!g!!aws ec2&ef_id=WkRozwAAAnO-lPWy:20180412120123:s) - 클라우드 환경 컴퓨팅 시스템
* [AWS RDS](https://aws.amazon.com/ko/rds/) - 클라우드 환경 데이터베이스 관리 시스템
* [AWS S3](https://aws.amazon.com/ko/s3/?sc_channel=PS&sc_campaign=acquisition_KR&sc_publisher=google&sc_medium=english_s3_b&sc_content=s3_e&sc_detail=aws s3&sc_category=s3&sc_segment=177211245240&sc_matchtype=e&sc_country=KR&s_kwcid=AL!4422!3!177211245240!e!!g!!aws s3&ef_id=WkRozwAAAnO-lPWy:20180412120059:s) - 클라우드 환경 데이터 저장소



## 사용된 도구

* [Node.js](https://nodejs.org/ko/) - Chrome V8 자바스크립트 엔진으로 빌드된 자바스크립트 런타임

- [Express.js](http://expressjs.com/ko/) - Node.js 웹 애플리케이션 프레임워크
- [NPM](https://rometools.github.io/rome/) - 자바 스크립트 패키지 관리자
- [PM2](http://pm2.keymetrics.io/) - Express 앱용 프로세스 관리자
- [vscode](https://code.visualstudio.com/) - 편집기
- [Mysql](https://www.mysql.com/) - DataBase



## 개발자

* [김현진](https://github.com/hyunjkluz)
* [백예은](https://github.com/bye0520)
* [이상윤](https://github.com/syndersonLEE)

[기여자 목록](https://github.com/JeonHa/JeonHa-Server/graphs/contributors)을 확인하여 이 프로젝트에 참가하신 분들을 보실 수 있습니다.