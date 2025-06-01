import { useState, useEffect } from 'react';

// 드롭다운 아이콘
const ChevronDownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
    </svg>
);


export default function SearchBar() {

    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가

    const getUserCoorinates = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('이 브라우저는 Geolocaion을 지원하지 않습니다.'));
            } else {
                navigator.geolocation.getCurrentPosition(
                    // navigator.geolocation -> 웹 브라우저가 제공하는 객체
                    (position) => resolve(position.coords),
                    // position 객체의 coords에는 위도 경도등..
                    (error) => reject(new Error(`위치 정보를 가져오는데 실패했습니다: ${error.message}`))
                );
            }
        });
    };

    const fetchAddressFromBackend = async (latitude, longitude) => {
        try {
            const response = await fetch(`http://localhost:4000/loc/get-address?lat=${latitude}&lng=${longitude}`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            if (data.dong) {
                return data.dong;
            } else {
                throw new Error('주소를 가져올 수 없습니다.');
            }
        } catch (err) {
            console.error('백엔드 API 호출 오류:', err);
            throw new Error(`주소 정보를 가져오는데 실패했습니다. ${err.message}`);
        }
    };

    useEffect(() => {
        const loadUserLocation = async () => {
            try {
                const coords = await getUserCoorinates();
                const { latitude, longitude } = coords;

                const dong = await fetchAddressFromBackend(latitude, longitude);
                setLocation(dong);
                setError(null);
            } catch (err) {
                console.error('위치 정보 로드 실패:', err);
                setError(err.message); // 에러 메시지 설정
                setLocation('위치 정보 없음'); // 실패 시 기본값 설정
            } finally {
                setIsLoading(false); // 로딩 완료
            }
        };

        loadUserLocation();
    }, []); // 컴포넌트 마운트 시 한 번만 실행
    return (
        <>
            <div className="searchbar-container">
                <div className="searchbar-location text-20px">
                    <span>{location}</span>
                    {/* <ChevronDownIcon /> */}
                </div>
                <div className="searchbar-input-wrapper">
                    <input
                        type="text"
                        placeholder=" 상품명을 입력해주세요"
                        className="searchbar-input text-14px"
                    />

                </div>
                <button className="searchbar-button text-20px">
                    중고거래
                    <span className="searchbar-button-dot"></span>
                </button>
            </div>
            <div className="popular-keywords text-14px">
                인기검색어: <span>굿즈</span> <span>플스</span> <span>냉장고</span> <span>다이슨</span> <span>자전거</span> <span>노트북</span> <span>의자</span> <span>책상</span> <span>아이패드</span> <span>에어팟</span>
            </div>
        </>
    );
}