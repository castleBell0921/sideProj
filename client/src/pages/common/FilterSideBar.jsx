import React, { useState } from 'react'; 

export default function FilterSidebar() {
  // 각 필터 섹션별로 선택된 값을 관리하기 위한 상태 (예시)
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedPriceRange, setSelectedPriceRange] = useState('');

  const locations = ['서울특별시 용산구', '이태원동', '한남동', '이촌동', '후암동', '한강로동', '이촌제1동', '효창동', '한강로3가'];
  const categories = [
    '디지털기기', '생활가전', '가구/인테리어', '생활/주방', '유아동',
    '여성의류', '여성잡화', '남성패션/잡화', '뷰티/미용', '스포츠/레저',
    '취미/게임/음반', '도서', '티켓/교환권', '식품', '반려동물용품',
    '식물', '기타 중고물품', '구매 희망'
  ];
  const priceRanges = ['5,000원 이하', '10,000원 이하', '30,000원 이하'];

  // 더보기 버튼 상태
  const [showAllLocations, setShowAllLocations] = useState(false);
  const initialLocationCount = 5; // 초기에 보여줄 위치 항목 수

  return (
    <aside className="filter-sidebar-container">
      <div className="filter-section">
        <div className="filter-section-header">
          <h2 className="filter-title text-20px">필터</h2>
          <button className="filter-reset-button text-14px">초기화</button>
        </div>
        <label className="filter-checkbox-label text-18px">
          <input type="checkbox" className="filter-checkbox" /> 거래 가능만 보기
        </label>
      </div>

      <div className="filter-section">
        <h2 className="filter-title text-20px">위치</h2>
        <ul className="filter-list">
          {(showAllLocations ? locations : locations.slice(0, initialLocationCount)).map(loc => (
            <li key={loc} className="filter-list-item">
              <input
                type="radio"
                id={`loc-${loc}`}
                name="location"
                value={loc}
                checked={selectedLocation === loc}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="filter-radio"
              />
              <label htmlFor={`loc-${loc}`} className="filter-label text-18px">{loc}</label>
            </li>
          ))}
        </ul>
        {!showAllLocations && locations.length > initialLocationCount && (
          <button
            onClick={() => setShowAllLocations(true)}
            className="filter-more-button text-16px"
          >
            더보기
          </button>
        )}
      </div>

      <div className="filter-section">
        <h2 className="filter-title text-20px">카테고리</h2>
        <ul className="filter-list">
          {categories.map(cat => (
            <li key={cat} className="filter-list-item">
              <input
                type="radio"
                id={`cat-${cat}`}
                name="category"
                value={cat}
                checked={selectedCategory === cat}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-radio"
              />
              <label htmlFor={`cat-${cat}`} className="filter-label text-18px">{cat}</label>
            </li>
          ))}
        </ul>
      </div>

      <div className="filter-section">
        <h2 className="filter-title text-20px">가격</h2>
        <ul className="filter-list">
          {priceRanges.map(range => (
            <li key={range} className="filter-list-item">
              <input
                type="radio"
                id={`price-${range}`}
                name="priceRange"
                value={range}
                checked={selectedPriceRange === range}
                onChange={(e) => setSelectedPriceRange(e.target.value)}
                className="filter-radio"
              />
              <label htmlFor={`price-${range}`} className="filter-label text-18px">{range}</label>
            </li>
          ))}
          <li className="filter-list-item price-input-item">
            <input type="text" placeholder="0" className="price-input text-16px" />
            <span className="text-16px price-input-separator">-</span>
            <input type="text" placeholder="0" className="price-input text-16px" />
            <br/>
            <button className="price-apply-button text-16px">적용</button>
          </li>
        </ul>
      </div>
    </aside>
  );
}