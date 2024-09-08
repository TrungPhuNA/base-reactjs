import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const MenuDeleteModal = ({ showDeleteModal, setShowDeleteModal, handleDeleteMenu }) => {
    return (
        <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Menu</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete this menu? This action cannot be undone.
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleDeleteMenu}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default MenuDeleteModal;
