import React from 'react';
import {Container, Navbar, Nav, NavDropdown, Dropdown} from 'react-bootstrap';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import './UserLayout.css';
import {logout} from "../redux/slices/authSlice";
import {useDispatch} from "react-redux";
const UserLayout = ({ isAuthenticated, user, onLogout }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch action logout để đăng xuất người dùng
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/admin">ADMIN</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/admin/orders">Đơn hàng</Nav.Link>
                        <Nav.Link as={Link} to="/admin/services">Dịch Vụ</Nav.Link>
                        <Nav.Link as={Link} to="/admin/appointments">Đặt lịch</Nav.Link>
                        <Nav.Link as={Link} to="/admin/promotions">Khuyến mãi</Nav.Link>
                        <Nav.Link as={Link} to="/admin/user">Tài khoản</Nav.Link>
                        <Nav.Link as={Link} to="/admin/menus">Menu chia sẻ</Nav.Link>
                        <Nav.Link as={Link} to="/admin/categories">Danh mục</Nav.Link>
                        <Nav.Link as={Link} to="/admin/products">Sản phẩm</Nav.Link>
                    </Nav>
                    <Nav>
                        <Dropdown align="end">
                            <Dropdown.Toggle as={Nav.Link} id="dropdown-user">
                                <img
                                    src={user.avatar || 'https://via.placeholder.com/150'}
                                    alt="Avatar"
                                    style={{ width: 30, height: 30, borderRadius: '50%', marginRight: 10 }}
                                />
                                {user.name}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as={Link} to="/admin/profile">Profile</Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Nav>
                </Container>
            </Navbar>
            <Container>
                <Outlet />
            </Container>
            <footer className="text-center mt-4">
                <p>User Footer</p>
            </footer>
        </>
    );
};

export default UserLayout;
