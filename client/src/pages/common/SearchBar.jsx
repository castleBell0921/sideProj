
// 드롭다운 아이콘 
const ChevronDownIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" width="16" height="16">
    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
  </svg>
);


export default function SearchBar() {
  return (
    <>
      <div className="searchbar-container">
        <div className="searchbar-location text-20px">
          <span>이태원동</span>
          <ChevronDownIcon />
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