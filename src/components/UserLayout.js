import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const UserLayout = ({ isAuthenticated, user, onLogout }) => {
    console.info("===========[UserLayout] ===========[] : ",user);
    const handleLogout = () => {
        onLogout();
    };

    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/user">User</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/user/orders">Quản lý đơn hàng</Nav.Link>
                        <Nav.Link as={Link} to="/user/profile">Cập nhật thông tin</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <NavDropdown title={<img src={user.avatar} alt="avatar" style={{ width: '40px',height: '40px',borderRadius: '50%'}} className="avatar" />} id="user-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/user/profile">Cập nhật thông tin</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/user/orders">Quản lý đơn hàng</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={handleLogout}>Đăng xuất</NavDropdown.Item>
                            </NavDropdown>
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
