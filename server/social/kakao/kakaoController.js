// kakaoController.js
const kakao = require('./kakao');

exports.kakaoCallback = async (req, res) => {
    const { code } = req.query;
    console.log('카카오 인가 코드 (Controller):', code);

    try {
        const tokenData = await kakao.KakaoClient.getToken(code); // KakaoClient를 통해 호출
        console.log('카카오 토큰 정보:', tokenData);

        // 받은 토큰으로 사용자 정보 가져오기
        const userInfo = await kakao.KakaoClient.getUserInfo(tokenData.access_token); // KakaoClient를 통해 호출
        console.log('카카오 사용자 정보:', userInfo);

        // 사용자 정보를 데이터베이스에 저장하거나, 세션에 저장하는 등의 로직 처리

        res.send('카카오 로그인 성공!'); // 또는 사용자 정보를 보여주는 페이지로 리다이렉트
    } catch (error) {
        console.error('카카오 로그인 처리 오류:', error);
        res.status(500).send('카카오 로그인 처리 오류');
    }
};