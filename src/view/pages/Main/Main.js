import { Component } from "react";
import { BrowserRouter as Router, Route, Link, Routes, Outlet } from 'react-router-dom';
import '../Main/Main.css'
import Product from "../Products/Product/Product";
import Category from "../Products/category/Category";
import OrderBaru from "../Orders/OrderBaru/OrderBaru";
import OrderSelesai from "../Orders/OrderSelesai/OrderSelesai";
import BatalOrder from "../Orders/BatalOrder/BatalOrder";
import PengirimanKembali from "../Orders/PengirimanKembali/PengirimanKembali";
import OngoingOrder from "../Orders/OngoingOrder/OngoingOrder";
import DaftarPembelian from "../Transasksi/DaftarPembelian/DaftarPembelian";
import DaftarPenjualan from "../Transasksi/DaftarPenjualan/DaftarPenjualan";
import TambahProduk from "../Products/Product/TambahProduk/TambahProduk";
import DetailProduk from "../Products/Product/DetailProduk/DetailProduk";
import UpdateProduct from "../Products/Product/UpdateProduk/UpdateProduct";
import CategoryDetail from "../Products/category/DetailCategory/DetailCategory";

class Main extends Component {
    render() {
        const { isSidebarOpen } = this.props; // Receive isSidebarOpen as a prop
        console.log(isSidebarOpen)
        // Add a class to adjust the size of the main content based on isSidebarOpen
        const mainContentClass = isSidebarOpen ? 'main-content-open' : '';
        return (
            <div className={`main-container ${mainContentClass}`}>
                <Routes>
                <Route path="/" element={<div><h1>Welcome</h1></div>} />
                    {/* Products */}
                    <Route path="/products" element={<Product />}/>
                    <Route path='/products/tambah-produk' element={<TambahProduk/>}/>
                    <Route path="/update-product/:id" element={<UpdateProduct/>} />
                    <Route path='/product/:id' element={<DetailProduk/>}/>
                    <Route path="/category" element={<Category />} />
                    <Route path="/detail-category/:id" element={<CategoryDetail/>}/>
                    {/* Order */}
                    <Route path="/order-baru" element={<OrderBaru/>}/>
                    <Route path="/order-selesai" element={<OrderSelesai/>}/>
                    <Route path="/batal-order" element={<BatalOrder/>} />
                    <Route path="/ongoing-order" element={<OngoingOrder/>}/>
                    <Route path="/pengiriman-kembali" element={<PengirimanKembali/>}/>
                    {/* Transaksi */}
                    <Route path="/daftar-pembelian" element={<DaftarPembelian/>}/>
                    <Route path="/daftar-penjualan" element={<DaftarPenjualan/>}/>
                    
                </Routes>
            </div>
        )
    }
}
export default Main;