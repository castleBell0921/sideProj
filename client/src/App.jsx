import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home.jsx'
import SignUp from './pages/user/signUp/SignUpContainer.jsx'
import ProductDetailPage from './pages/product/ProductDetailPage.jsx'
import AuctionDetailPage from './pages/product/AuctionDetailPage.jsx'
import AuctionForm from './pages/product/AuctionForm.jsx'
import ProductForm from './pages/product/ProductForm.jsx'
import './styles/font.css';


const App = () => {
  return (
    <BrowserRouter>
      <div className="app-container"> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/productDetail" element={<ProductDetailPage />} />
          <Route path="/auctionDetail" element={<AuctionDetailPage />} />
          <Route path="/auctionForm" element={<AuctionForm />}/>
          <Route path="/productForm" element={<ProductForm />}/>
          {/* 다른 라우트들도 여기에 위치 */}
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App
