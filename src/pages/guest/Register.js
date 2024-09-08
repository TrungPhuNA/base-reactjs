import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './style/Login.css';
import { useDispatch, useSelector } from 'react-redux';
import {registerUser} from "../../redux/slices/authSlice";

const Register = () => {
    const initialValues = {
        email: '',
        name: '',
        password: '',
        confirmPassword: '',
        role: 'customer'
    };
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Required'),
        name: Yup.string().required('Required'),
        password: Yup.string().min(6, 'Password must be at least 6 characters').required('Required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Required')
    });

    const onSubmit = async (values, { setSubmitting, setErrors }) => {
        console.info("===========[] ===========[values] : ", values);
        const result = await dispatch(registerUser(values));
        if (registerUser.fulfilled.match(result)) {
            console.info("===========[register] ===========[success] : ", result);
            navigate('/login');
        } else {
            console.error("===========[register] ===========[failed] : ", result);
            setErrors({ submit: "Đăng ký thất bại, vui lòng thử lại." });
        }
        setSubmitting(false);
    };

    return (
        <Row className="no-gutter">
            <Row className="col-md-6 d-none d-md-flex bg-image"></Row>
            <Row className="col-md-6 bg-light">
                <div className="login d-flex align-items-center py-5">
                    <Container className="container">
                        <Row className="row">
                            <Col className="col-lg-12 col-xl-8 mx-auto">
                                <h4 className="display-6">Đăng ký tài khoản</h4>
                                <p className="text-muted mb-4">Xin vui lòng điền đẩy đủ thông tin</p>
                                {error && <Alert variant="danger">{error.message}</Alert>}
                                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
                                    {({ isSubmitting }) => (
                                        <Form>
                                            <div className="mb-3">
                                                <label htmlFor="email">Name</label>
                                                <Field name="name" type="text" className="form-control"/>
                                                <ErrorMessage name="name" component="div" className="text-danger"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="email">Email</label>
                                                <Field name="email" type="email" className="form-control"/>
                                                <ErrorMessage name="email" component="div" className="text-danger"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="password">Password</label>
                                                <Field name="password" type="password" className="form-control"/>
                                                <ErrorMessage name="password" component="div" className="text-danger"/>
                                            </div>
                                            <div className="mb-3">
                                                <label htmlFor="confirmPassword">Confirm Password</label>
                                                <Field name="confirmPassword" type="password" className="form-control"/>
                                                <ErrorMessage name="confirmPassword" component="div"
                                                              className="text-danger"/>
                                            </div>
                                            <Button type="submit" className="w-100" disabled={isSubmitting}>
                                                Login
                                            </Button>
                                            <div className="text-center d-flex justify-content-between mt-4">
                                                <p>Bạn đã có tài khoản? Đăng nhập <Link to={'/login'}
                                                                                        className="font-italic text-muted">
                                                    <u>tại đây</u></Link>
                                                </p>
                                                <Link to={'/'} className="font-italic text-danger">Trang chủ</Link>
                                            </div>
                                            <div className="text-center d-flex justify-content-between mt-4"><p>Code
                                                by <Link to={'/'}
                                                         className="font-italic text-muted"><u>Phuphan</u></Link></p>
                                            </div>
                                        </Form>
                                    )}
                                </Formik>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </Row>
        </Row>
    )
};

export default Register;
