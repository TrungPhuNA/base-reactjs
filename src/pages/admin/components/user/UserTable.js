import React from 'react';
import {Table, Button, Image, Badge, ButtonGroup, Dropdown} from 'react-bootstrap';
import moment from 'moment';
import {FaListUl} from "react-icons/fa";

const UserTable = ({ users, openUserModal, setUserToDelete, setShowDeleteModal }) => {
    const defaultImage = "https://via.placeholder.com/150";
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Date</th>
                <th>Role</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user, index) => (
                <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                        <Image
                            src={user.avatar || defaultImage}
                            alt={user.name}
                            width="60"
                            height="60"
                            roundedCircle
                            className=""
                        />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{moment(user.dateOfBirth).format('HH:mm DD-MM-YYYY')}</td>
                    <td>
                        <Badge
                            pill
                            bg={
                                user.role === 'admin' ? 'danger' :
                                user.role === 'staff' ? 'success' :
                                    user.role === 'doctor' ? 'dark' :
                                        'primary' // default color for 'customer'
                            }
                        >
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                    </td>
                    <td>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                <FaListUl/>
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openUserModal(user)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setUserToDelete(user);
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

export default UserTable;
