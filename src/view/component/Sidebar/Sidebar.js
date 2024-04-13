import React, { Component } from "react";
import { Link } from "react-router-dom";
import '../Sidebar/Sidebar.css';
import Product from "../../pages/Products/Product/Product";

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidebarOpen: false
        };
    }

    toggleSidebar = () => {
        this.setState((prevState) => ({
            isSidebarOpen: !prevState.isSidebarOpen
        }));
    };
    
    render() {
        
        const { isSidebarOpen } = this.state;
        const sidebarClass = isSidebarOpen ? 'open' : '';
        console.log(isSidebarOpen)
        return (
            <div className={`sidebar ${sidebarClass}`}>
                <div className="burger-button" onClick={this.toggleSidebar}>
                    <i className="bi bi-list"></i>
                </div>
                <div className="row">
                    {/* products */}
                    <div className="col-md-12 menu">
                        <h5>Produk</h5>
                        <hr/>
                        <div className="row">
                            <div className="col-md-12 item-menu">
                                <Link to="/products" onClick={this.toggleSidebar}>Produk</Link>
                            </div>
                            <div className="col-md-12 item-menu">
                                <Link to="/category" onClick={this.toggleSidebar}>Categori</Link>
                            </div>
                        </div>
                    </div>
                    {/* order */}
                    <div className="col-md-12 menu">
                        <h5>Orders</h5>
                        <hr/>
                        <div className="row">
                            <div className="col-md-12 item-menu">
                                <Link to="/order-baru" onClick={this.toggleSidebar}>Order Baru</Link>
                            </div>
                            <div className="col-md-12 item-menu">
                                <Link to="/order-selesai" onClick={this.toggleSidebar}>Order Selesai</Link>
                            </div>
                            <div className="col-md-12 item-menu">
                                <Link to="/batal-order"onClick={this.toggleSidebar}>Batal Order</Link>
                            </div>
                            <div className="col-md-12 item-menu">
                                <Link to="/ongoing-order" onClick={this.toggleSidebar}>Ongoing Order</Link>
                            </div>
                            <div className="col-md-12 item-menu">
                                <Link to="/pengiriman-kembali" onClick={this.toggleSidebar}>Pengiriman Kembali</Link>
                            </div>
                        </div>
                    </div>
                    {/* transaksi */}
                    <div className="col-md-12 menu">
                        <h5>Transaksi</h5>
                        <hr/>
                        <div className="row">
                            <div className="col-md-12 item-menu">
                                <Link to="/daftar-penjualan" onClick={this.toggleSidebar}>Daftar Penjualan</Link>
                            </div>
                            <div className="col-md-12 item-menu">
                                <Link to="/daftar-pembelian" onClick={this.toggleSidebar}>Daftar Pembelian</Link>
                            </div>
                        </div>
                    </div>
                    {/* channel */}
                    <div className="col-md-12 menu">
                        <h5>Channel</h5>    
                        <hr/>
                        <div className="row">
                            <div className="col-md-12 item-menu">
                                <Link to="#" onClick={this.toggleSidebar}>Whatsapp</Link>
                            </div>
                            <div className="col-md-12 item-menu">
                                <Link to="#" onClick={this.toggleSidebar}>Instagram</Link>
                            </div>
                            <div className="col-md-12 item-menu">
                                <Link to="#" onClick={this.toggleSidebar}>Platform</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
