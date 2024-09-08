import React from 'react';
import {Breadcrumb, Col, Container, Nav, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const AdminDashboard = () => {
    return (
        <Container>
            <Row className="gutters mt-3">
                <Col xl={12}>
                    <Breadcrumb>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={Link} to="/Admin">Admin</Nav.Link>
                        </Nav.Item>
                        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
            </Row>
        </Container>
    )
};

export default AdminDashboard;
