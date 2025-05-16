// KakaoButton.jsx (예시 - 이전 코드 활용)
import React from 'react';
import '../../../styles/LoginModal.css'; // 스타일 시트 임포트

function KakaoButton() {
  /**
   * @description URL 가져오기
   */
  const fetchGetURL = async () => {
    try {
      const response = await fetch("http://localhost:4000/social/kakao/auth-url");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const { url } = data;

      console.log(url); // 응답으로 온 url
      window.location.href = url; // URL로 리다이렉트
    } catch (error) {
      alert("카카오 로그인 URL을 가져오는 데 실패했습니다!");
      console.error(error);
    }
  };

  return (
    <button className="kakao_button" onClick={fetchGetURL}  >
      <img src="/image/kakao_login.png" alt="카카오 로그인" className="kakao_image"/>
    </button>
  );
}

export default KakaoButton;