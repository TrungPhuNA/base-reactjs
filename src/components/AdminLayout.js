import React from 'react';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = ({ isAuthenticated, user }) => {
    return (
        <>
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/admin">Admin</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/admin/products">Quản lý sản phẩm</Nav.Link>
                        <Nav.Link as={Link} to="/admin/posts">Quản lý bài viết</Nav.Link>
                        <Nav.Link as={Link} to="/admin/menu">Quản lý menu</Nav.Link>
                    </Nav>
                    <Nav>
                        {isAuthenticated ? (
                            <NavDropdown title={<img src={user.avatar} alt="avatar" className="avatar" />} id="admin-nav-dropdown">
                                <NavDropdown.Item as={Link} to="/user/profile">Cập nhật thông tin</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/user/orders">Quản lý đơn hàng</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item as={Link} to="/logout">Đăng xuất</NavDropdown.Item>
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
                <p>Admin Footer</p>
            </footer>
        </>
    );
};

export default AdminLayout;
