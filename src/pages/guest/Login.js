import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './style/Login.css';
import { loginUser } from "../../redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {unwrapResult} from "@reduxjs/toolkit";
import bgImage from '../../assets/images/bg-login.jpg';
import toastr from 'toastr';

const Login = () => {
    const initialValues = {
        email: '',
        password: ''
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error, isAuthenticated } = useSelector((state) => state.auth); // Add isAuthenticated

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Điều hướng chỉ khi isAuthenticated là true
        }
        console.info("===========[] ===========[error] : ",error);
    }, [isAuthenticated, navigate]);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required')
    });

    const onSubmit = async (values, { setSubmitting }) => {
        try {
            const result = await dispatch(loginUser(values));
            console.info("===========[userLogin] ===========[response] : ",result);
            if (loginUser.fulfilled.match(result)) {
                let response = await unwrapResult(result);
                console.info("===========[userLogin] ===========[response math] : ",response);
                if(response.user.role === 'admin' || response.user.role === 'staff') {
                    // window.location.href = '/admin';
                    navigate('/admin');
                }else {
                    // window.location.href = '/';
                    navigate('/');
                }
                return true;
            }else {
                console.info("===========[] ===========[FAIL ROI] : ");
                // toastr.error('Sai thông tin hoạc tài khoản không hợp lệ', 'Error');
                setSubmitting(false);
                return true;
            }
        } catch (err) {
            console.info("===========[err] ===========[FAIL ROI] : ");
            toastr.error('Sai thông tin hoạc tài khoản không hợp lệ', 'Error');
            setSubmitting(false);
        }
    };

    return (
        <Row className="no-gutter">
            <Col className="col-md-6 d-none d-md-flex bg-image" style={{ backgroundImage: `url(${bgImage})` }}></Col>
            <Col className="col-md-6 bg-light">
                <div className="login d-flex align-items-center py-5">
                    <Container>
                        <Row>
                            <Col lg={12} xl={8} className="mx-auto">
                                <h4 className="display-6">Đăng nhập hệ thống</h4>
                                <p className="text-muted mb-4">Xin vui lòng điền đẩy đủ thông tin</p>
                                {error && error.trim() && <Alert variant="danger">{error}</Alert>}
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
                                            <Button type="submit" className="w-100" disabled={isSubmitting || loading}>
                                                {loading ? 'Logging in...' : 'Login'}
                                            </Button>
                                            <div className="text-center d-flex justify-content-between mt-4">
                                                <p>Bạn chưa có tài khoản? Đăng ký <Link to={'/register'} className="font-italic text-muted">
                                                    <u>tại đây</u></Link>
                                                </p>
                                                <Link to={'/'} className="font-italic text-danger">Trang chủ</Link>
                                            </div>
                                            <div className="text-center d-flex justify-content-between mt-4">
                                                <p>Code by <Link to={'/'} className="font-italic text-muted"><u>Phuphan</u></Link></p>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Col>
        </Row>
    );
};

export default Login;
