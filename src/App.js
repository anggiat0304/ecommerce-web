import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider
import store from './store/store';
import Login from './view/pages/Login/Login';
import { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import MainLayout from './view/component/MainLayout/MainLayout';
import Product from './view/pages/Products/Product/Product';
import Category from './view/pages/Products/category/Category';
import OrderBaru from './view/pages/Orders/OrderBaru/OrderBaru';
import OrderSelesai from './view/pages/Orders/OrderSelesai/OrderSelesai';
import BatalOrder from './view/pages/Orders/BatalOrder/BatalOrder';
import PengirimanKembali from './view/pages/Orders/PengirimanKembali/PengirimanKembali';
import OngoingOrder from './view/pages/Orders/OngoingOrder/OngoingOrder';
import DaftarPembelian from './view/pages/Transasksi/DaftarPembelian/DaftarPembelian';
import DaftarPenjualan from './view/pages/Transasksi/DaftarPenjualan/DaftarPenjualan';
import TambahProduk from './view/pages/Products/Product/TambahProduk/TambahProduk';
import DetailProduk from './view/pages/Products/Product/DetailProduk/DetailProduk';
import UpdateProduct from './view/pages/Products/Product/UpdateProduk/UpdateProduct';
import CategoryDetail from './view/pages/Products/category/DetailCategory/DetailCategory';
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainLayout />}>
              {/* Menyertakan rute tambahan di dalam bagian Main */}
              {/* Products */}
              <Route path="/products" element={<Product />} />
              <Route path='/products/tambah-produk' element={<TambahProduk />} />
              <Route path="/update-product/:id" element={<UpdateProduct/>} />
              <Route path='/product/:id' element={<DetailProduk />} />
              <Route path="/category" element={<Category />} />
              <Route path="/detail-category/:id" element={<CategoryDetail/>}/>
              {/* Order */}
              <Route path="/order-baru" element={<OrderBaru />} />
              <Route path="/order-selesai" element={<OrderSelesai />} />
              <Route path="/batal-order" element={<BatalOrder />} />
              <Route path="/ongoing-order" element={<OngoingOrder />} />
              <Route path="/pengiriman-kembali" element={<PengirimanKembali />} />
              {/* Transaksi */}
              <Route path="/daftar-pembelian" element={<DaftarPembelian />} />
              <Route path="/daftar-penjualan" element={<DaftarPenjualan />} />
            </Route>
          </Routes>
        </Router>
      </Provider>
    );
  }
}


const PrivateRoute = ({ component: Component, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('token'));

  return (
    <Route
      {...rest}
      element={user ? <Component user={user} /> : <Navigate to="/" replace />}
    />
  );
};

export default App;
