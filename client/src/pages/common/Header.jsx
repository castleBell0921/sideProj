// Header.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginModal from '../user/login/LoginModalContainer';
import '../../styles/common.css'; // 스타일 시트 임포트



const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/checkLogin', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
      } else {
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error('로그인 상태 확인 오류:', error);
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus(); // 컴포넌트 마운트 시 로그인 상태 확인

    const loginSuccess = searchParams.get('loginSuccess');
    if (loginSuccess === 'true') {
      alert('로그인 완료되었습니다.');
      checkLoginStatus(); // 카카오 로그인 후에도 상태 업데이트
      navigate(window.location.pathname, { replace: true });
    }
  }, [searchParams, navigate]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logout', {
        method: 'post',
        credentials: 'include',
      });

      if (response.ok) {
        alert('로그아웃되었습니다.');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 요청 오류: ', error);
    }
  };

  const handleHome = () => {
    console.log('click!');
    navigate('/');
  }

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (
      <div className="signIn">
      <span>
        <button className="logoButton" onClick={handleHome}>
          <img src="/image/딜온로고.png" alt="메인페이지이동" className="home"/>
        </button>
      </span>
        <span className="join">
        {isLoggedIn ? (
            <div className="loginHeader">
              <p>채팅하기</p>
              <p>판매하기</p>
              <p>마이페이지</p>
              <p onClick={handleLogout}>로그아웃</p>
            </div>
        ) : (
            <p onClick={openLoginModal}>로그인 | 회원가입</p>
        )}
      </span>
        <LoginModal
            isOpen={isLoginModalOpen}
            onRequestClose={closeLoginModal}
            onLoginSuccess={handleLoginSuccess} // 콜백 함수를 props로 전달
            isLoggedIn={isLoggedIn}
            checkLoginStatus={checkLoginStatus} // checkLoginStatus 함수를 props로 전달
        />
      </div>
  );
};

export default Header;