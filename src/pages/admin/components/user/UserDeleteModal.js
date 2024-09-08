import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const UserDeleteModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteUser }) => {
    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
                <Button variant="danger" onClick={handleDeleteUser}>Delete</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default UserDeleteModal;
