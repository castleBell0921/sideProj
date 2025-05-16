const express = require('express');
const router = express.Router();
const kakao = require('./kakao');
const { kakaoService } = require('./kakaoService');

// 카카오 인가 코드 요청 URL 생성 및 전달
router.get('/auth-url', (req, res) => {
    const authURL = kakao.KakaoClient.getAuthCodeURL();
    res.json({ url: authURL }); 
  });
  
  // 카카오 콜백 처리 (인가 코드 받기, 토큰 교환 등)
  router.get('/callback', async (req, res) => {
    const { code } = req.query;
    console.log('카카오 인가 코드:', code);
  
    try {
      const tokenData = await kakao.KakaoClient.getToken(code);

      const userInfo = await  kakao.KakaoClient.getUserInfo(tokenData.access_token);
      console.log('userInfo: ' + userInfo.properties.nickname);
      const { id: socialId, properties: { nickname, profile_Image } } = userInfo;
      const kakaoUserInfo = await kakaoService(socialId);
      if(!kakaoUserInfo) {
        return res.redirect(`http://localhost:5173/signUp?nickname=${nickname}&profileImage=${profile_Image}&socialId=${socialId}`);
      } else {
        req.session.user = {
          inform: kakaoUserInfo
        };
        req.session.isLoggedIn = true;
        return res.redirect('http://localhost:5173/?loginSuccess=true'); // 로그인 성공 정보 추가

      }
      
    } catch(error) {
      console.error('카카오 로그인 오류: ', error);
      res.status(500).send('카카오 로그인 오류');
    }

  });
  
  module.exports = router;