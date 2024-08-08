// components/RegisterLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';

const RegisterLayout = () => {
    return (
        <Container>
            <Outlet />
        </Container>
    );
};

export default RegisterLayout;
