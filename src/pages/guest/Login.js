import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import apiHelper from '../../api/apiHelper';

const Login = ({ onLogin }) => {
    const initialValues = {
        email: '',
        password: ''
    };

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        try {
            const response = await apiHelper.post('/auth/login', values);
            if(response.status === "success") {
                onLogin(response.data.user, response.data.token);
                navigate('/'); // Redirect to home or dashboard
            }else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('Login failed. Please check your credentials.');
            setSubmitting(false);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100" style={{ maxWidth: '400px' }}>
                <Col>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Login</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-3">
                                            <label htmlFor="email">Email</label>
                                            <Field name="email" type="email" className="form-control" />
                                            <ErrorMessage name="email" component="div" className="text-danger" />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password">Password</label>
                                            <Field name="password" type="password" className="form-control" />
                                            <ErrorMessage name="password" component="div" className="text-danger" />
                                        </div>
                                        <Button type="submit" className="w-100" disabled={isSubmitting}>
                                            Login
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Need an account? <Link to="/register">Register</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;

