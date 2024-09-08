import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserFormModal = ({ showUserModal, setShowUserModal, editingUser, handleAddEditUser }) => {
    const [formData, setFormData] = useState({ name: '', email: '', role: 'user', password: '' });

    useEffect(() => {
        if (editingUser) {
            setFormData(editingUser);
        } else {
            setFormData({ name: '', email: '', role: 'customer', password: '' });
        }
    }, [editingUser]);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddEditUser(formData);
    };

    return (
        <Modal show={showUserModal} onHide={() => setShowUserModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingUser ? 'Edit User' : 'Add New User'}</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Role</Form.Label>
                        <Form.Control
                            as="select"
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            required
                        >
                            <option value="customer">Customer</option>
                            <option value="admin">Admin</option>
                            <option value="staff">Staff</option>
                        </Form.Control>
                    </Form.Group>
                    {!editingUser && (
                        <Form.Group>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                required={!editingUser}
                            />
                        </Form.Group>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowUserModal(false)}>Cancel</Button>
                    <Button type="submit" variant="primary">{editingUser ? 'Save Changes' : 'Add User'}</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UserFormModal;
