// MainLayout component
import { Component } from 'react';
import '../MainLayout/MainLayout.css';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Main from '../../pages/Main/Main';
import { Navigate } from 'react-router-dom';

class MainLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSidebarOpen: false,
            isAuthenticated: false
        };
    }

    toggleSidebar = () => {
        this.setState((prevState) => ({
            isSidebarOpen: !prevState.isSidebarOpen
        }));
    };

    componentDidMount() {
        // Check if user is authenticated (example: by checking token in local storage)
        const token = localStorage.getItem('token');
        console.log(token)
        if (token) {
            this.setState({ isAuthenticated: true });
        }
        if (token == null) {
            window.location.href = "/login";
        }
    }

    render() {
        const { isSidebarOpen, isAuthenticated } = this.state;
        
        console.log(isAuthenticated)
        const mainClass = isSidebarOpen ? 'open' : '';
        return (
            <div className="main-layout">
                <Header className="fixed-header"/>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-2 bg-light sidebar">
                            <Sidebar
                                isSidebarOpen={isSidebarOpen}
                                toggleSidebar={this.toggleSidebar}
                            />
                        </div>

                        <div className={`col-md-10 ml-sm-auto ${mainClass}`}>
                            <Main isSidebarOpen={isSidebarOpen} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default MainLayout;
