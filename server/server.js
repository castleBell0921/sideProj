// server.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
require('dotenv').config();
const userRoutes = require('./users/userRoutes'); // User 라우터 불러오기
const auth = require('./auth/authRoutes');
const kakaoRoutes = require('./social/kakao/kakaoRoutes'); // 카카오 라우터 import

const app = express();
const port = 4000;


// cors 설정 이유 -> 백, 클라이언트간의 권한 
// 미들웨어 적용 순서: cors -> session -> body-parser -> router
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,  // 쿠키 전달 허용
}));

app.use(express.json());
app.use(express.urlencoded({extended: true})); // url-encoded 요청 본문 파싱

app.use(session({
  secret: 'ghkd5370',   // 세션ID
  resave: false,        // 각 요청마다 세션을 강제로 저장할지 여부
  saveUninitialized: false, // 초기화되지 않은 세션 을 저장할지 여부 
  cookie: {
    maxAge: 1000 * 60 * 60 * 24,    // 세션 쿠키의 유효기간간
    httpOnly: true,                 // js(클라)에서 쿠키에 접근 방지 
    secure: process.env.NODE_ENV === 'production',  // https 환경에서만 쿠키 전송 설정
    sameSite: 'lax',    //CSRF 공격 방지지
  }
}))



app.use('/api', userRoutes);
app.use('/auth', auth);
app.use('/social/kakao', kakaoRoutes); // 카카오 관련 라우터를 '/social/kakao' 경로에 연결



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

