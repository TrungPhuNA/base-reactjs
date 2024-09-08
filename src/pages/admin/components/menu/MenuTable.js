import React from 'react';
import {Table, Button, ButtonGroup, Dropdown} from 'react-bootstrap';
import moment from "moment/moment";
import {FaListUl} from "react-icons/fa";

const MenuTable = ({ menus, openMenuModal, setMenuToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Name</th>
                <th>Description</th>
                <th>Created At</th>
                <th>Created By</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {menus.map((menu, index) => (
                <tr key={menu._id}>
                    <td>{index + 1}</td>
                    <td>{menu.name}</td>
                    <td>{menu.description}</td>
                    <td>{moment(menu.createdAt).format('HH:mm DD-MM-YYYY')}</td>
                    <td>{menu.createdBy?.name}</td>
                    <td>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                <FaListUl/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openMenuModal(menu)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setMenuToDelete(menu);
                                    setShowDeleteModal(true);
                                }}>Delete</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default MenuTable;
