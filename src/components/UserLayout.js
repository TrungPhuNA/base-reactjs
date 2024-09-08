import React from 'react';
import {Container, Navbar, Nav, NavDropdown, Dropdown} from 'react-bootstrap';
import {Outlet, Link, useNavigate} from 'react-router-dom';
import './UserLayout.css';
import {logout} from "../redux/slices/authSlice";
import {useDispatch} from "react-redux";
const UserLayout = ({ isAuthenticated, user, onLogout }) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout()); // Dispatch action logout để đăng xuất người dùng
        navigate('/login');
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/user">User</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/user/orders">Đơn hàng</Nav.Link>
                        <Nav.Link as={Link} to="/user/pets">My pets</Nav.Link>
                        <Nav.Link as={Link} to="/user/posts">Chia sẻ</Nav.Link>
                        <Nav.Link as={Link} to="/user/boarding">Ký gủi</Nav.Link>
                        <Nav.Link as={Link} to="/user/products">Sản phẩm</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
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
                                    <Dropdown.Item as={Link} to="/user/profile">Profile</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/user/pets">My Pets</Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/user/orders">My Orders</Dropdown.Item>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </>
                        )}
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
