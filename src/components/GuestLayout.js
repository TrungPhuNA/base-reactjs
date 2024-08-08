import React from 'react';
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap';
import { Outlet, Link, useLocation } from 'react-router-dom';
import HomeCarousel from "../pages/components/slide/HomeCarousel";
import Footer from "../pages/components/footer/Footer";
import './GuestLayout.css'
const GuestLayout = () => {
    const location = useLocation();

    return (
        <>
            <Navbar bg="" variant="dark" style={{ backgroundColor: '#e89305e6' }}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img src={require('./../assets/images/logo-2206.png')} alt="Logo" style={{ width: '60%' }} />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Trang chủ</Nav.Link>
                        <Dropdown>
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-custom-components">
                                Sản phẩm
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/c/pate">Pate</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/c/thuc-an-hat">Thức ăn hạt</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/category3">Bánh thường</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/category3">Thực phẩm chức năng</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/category3">Đồ chơi</Dropdown.Item>
                                <Dropdown.Item as={Link} to="/category3">Dụng cụ</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                        <Nav.Link as={Link} to="/">Dịch vụ</Nav.Link>
                        <Nav.Link as={Link} to="/">Đặt lịch</Nav.Link>
                        <Nav.Link as={Link} to="/">Chia sẻ</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link as={Link} to="/login">Login</Nav.Link>
                        <Nav.Link as={Link} to="/register">Register</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
            {location.pathname === '/' && <HomeCarousel />}
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </>
    );
};

export default GuestLayout;
