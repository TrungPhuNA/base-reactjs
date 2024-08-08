import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Card, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
    const initialValues = {
        email: '',
        password: '',
        confirmPassword: ''
    };

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required')
    });

    const onSubmit = (values, { setSubmitting, setErrors }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
            <Row className="w-100" style={{ maxWidth: '400px' }}>
                <Col>
                    <Card>
                        <Card.Body>
                            <h2 className="text-center mb-4">Register</h2>
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
                                        <div className="mb-3">
                                            <label htmlFor="confirmPassword">Confirm Password</label>
                                            <Field name="confirmPassword" type="password" className="form-control" />
                                            <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                                        </div>
                                        <Button type="submit" className="w-100" disabled={isSubmitting}>
                                            Register
                                        </Button>
                                    </Form>
                                )}
                            </Formik>
                        </Card.Body>
                    </Card>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <Link to="/login">Login</Link>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;
