import React, { useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const MenuFormModal = ({ showMenuModal, setShowMenuModal, editingMenu, handleAddEditMenu }) => {
    const [formValues, setFormValues] = useState({
        name: '',
        description: ''
    });

    useEffect(() => {
        if (editingMenu) {
            setFormValues({
                name: editingMenu.name,
                description: editingMenu.description,
            });
        } else {
            setFormValues({ name: '', description: '' });
        }
    }, [editingMenu]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        handleAddEditMenu(formValues);
    };

    return (
        <Modal show={showMenuModal} onHide={() => setShowMenuModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>{editingMenu ? 'Edit Menu' : 'Add New Menu'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="menuName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            value={formValues.name}
                            onChange={handleChange}
                            placeholder="Enter menu name"
                        />
                    </Form.Group>
                    <Form.Group controlId="menuDescription" className="mt-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            as="textarea"
                            name="description"
                            value={formValues.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Enter menu description"
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowMenuModal(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    {editingMenu ? 'Update' : 'Add'}
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MenuFormModal;
