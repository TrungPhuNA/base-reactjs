import React from 'react';
import { Table, Dropdown, ButtonGroup, Image } from 'react-bootstrap';
import { FaListUl } from "react-icons/fa";

const PetTable = ({ pets, defaultImage, formatCurrency, openPetModal, setPetToDelete, setShowDeleteModal }) => {
    return (
        <Table striped bordered hover responsive className="mt-3">
            <thead>
            <tr>
                <th style={{ textAlign: 'center', width: '100px' }}>Image</th>
                <th>Name</th>
                <th>Gender</th>
                <th>Age</th>
                <th>Type</th>
                <th>Price</th>
                <th style={{ textAlign: 'center', width: '200px' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {pets.map((pet) => (
                <tr key={pet._id}>
                    <td style={{ textAlign: 'center' }}>
                        <Image
                            src={pet.avatar || defaultImage}
                            alt={pet.name}
                            width="60"
                            height="60"
                            roundedCircle
                            className=""
                        />
                    </td>
                    <td style={{ verticalAlign: 'middle' }}>{pet.name}</td>
                    <td style={{ verticalAlign: 'middle' }}>{pet.gender}</td>
                    <td style={{ verticalAlign: 'middle' }}>{pet.age}</td>
                    <td style={{ verticalAlign: 'middle' }}>{pet.type}</td>
                    <td style={{ verticalAlign: 'middle' }}>{formatCurrency(pet.price || 0)}</td>
                    <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                        <Dropdown as={ButtonGroup}>
                            <Dropdown.Toggle variant="link" id="dropdown-basic">
                                <FaListUl />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => openPetModal(pet)}>Edit</Dropdown.Item>
                                <Dropdown.Item onClick={() => {
                                    setPetToDelete(pet);
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

export default PetTable;
