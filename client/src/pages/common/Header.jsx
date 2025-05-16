import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import LoginModal from '../user/login/LoginModalContainer';
import Cookies from 'js-cookie'; // js-cookie 라이브러리 import


const Header = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
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

    checkLoginStatus(); // 컴포넌트 마운트 시 로그인 상태 확인

    const loginSuccess = searchParams.get('loginSuccess');
    if (loginSuccess === 'true') {
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
        console.log('로그아웃 완료');
        setIsLoggedIn(false);
        navigate('/');
      } else {
        console.error('로그아웃 실패');
      }
    } catch (error) {
      console.error('로그아웃 요청 오류: ', error);
    }
  };

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };

  return (

    <div className="topbar-container text-20px">
      <div className="topbar-category">카테고리</div>
      <div className="topbar-actions">
        <button>채팅하기</button>
        <button>판매하기</button>
        <button>마이페이지</button>
        <span className="topbar-actions">
        {isLoggedIn ? (
          <button onClick={handleLogout}>로그아웃</button>
        ) : (
          <button onClick={openLoginModal}>로그인 | 회원가입</button>
        )}
      </span>
      </div>
      
      <LoginModal
        isOpen={isLoginModalOpen}
        onRequestClose={closeLoginModal}
        onLoginSuccess={handleLoginSuccess} // 콜백 함수를 props로 전달
        isLoggedIn={isLoggedIn}
      />
    </div>
    
    
  );
};

export default Header;