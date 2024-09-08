import React from 'react';
import { Modal, Row, Col, Form, Button } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import ReactQuill from 'react-quill';

const ServiceFormModal = ({
                              showServiceModal,
                              setShowServiceModal,
                              editingService,
                              handleAddEditService,
                              formatCurrencyInput
                          }) => {
    return (
        <Modal
            show={showServiceModal}
            onHide={() => setShowServiceModal(false)}
            dialogClassName="modal-fullscreen"
        >
            <Modal.Header closeButton>
                <Modal.Title>{editingService ? 'Edit Service' : 'Add New Service'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="justify-content-center">
                    <Col md={10}>
                        <Formik
                            initialValues={{
                                name: editingService?.name || '',
                                price: editingService?.price || 0,
                                type: editingService?.type || 'standard',
                                description: editingService?.description || '',
                            }}
                            validationSchema={Yup.object({
                                name: Yup.string().required('Required'),
                                price: Yup.number().required('Required').positive('Must be positive'),
                                type: Yup.string().required('Required'),
                                description: Yup.string(),
                            })}
                            onSubmit={handleAddEditService}
                        >
                            {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <Field name="name" className="form-control" />
                                        <ErrorMessage name="name" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Price</Form.Label>
                                        <Field
                                            name="price"
                                            type="text"
                                            className="form-control"
                                            value={formatCurrencyInput(values.price.toString())}
                                            onChange={(e) => {
                                                const rawValue = e.target.value.replace(/\./g, "");
                                                setFieldValue("price", rawValue);
                                            }}
                                        />
                                        <ErrorMessage name="price" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Type</Form.Label>
                                        <Field as="select" name="type" className="form-control">
                                            <option value="standard">Dịch vụ thường</option>
                                            <option value="vip">Dịch vụ VIP</option>
                                        </Field>
                                        <ErrorMessage name="type" component="div" className="text-danger" />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label>Description</Form.Label>
                                        <ReactQuill
                                            value={values.description}
                                            onChange={(value) => setFieldValue('description', value)}
                                            theme="snow"
                                        />
                                    </Form.Group>

                                    <Button type="submit" variant="success" disabled={isSubmitting}>
                                        {editingService ? 'Update Service' : 'Add Service'}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </Col>
                </Row>
            </Modal.Body>
        </Modal>
    );
};

export default ServiceFormModal;
