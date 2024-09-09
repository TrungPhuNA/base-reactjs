import React from 'react';
import { Table, Dropdown, ButtonGroup, Badge } from 'react-bootstrap';
import { FaListUl, FaStar } from "react-icons/fa";
import {stripHtmlTags} from "../../../../helpers/formatters";

const ServiceTable = ({ services, formatCurrency, openServiceModal, setServiceToDelete, setShowDeleteModal, user }) => {

    return (
        <Table striped bordered hover responsive className="mt-3">
            <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Type</th>
                <th>Rating</th> {/* Cột mới để hiển thị đánh giá */}
                <th style={{ textAlign: 'center', width: '200px' }}>Actions</th>
            </tr>
            </thead>
            <tbody>
            {services.map((service) => (
                <tr key={service._id}>
                    <td style={{ verticalAlign: 'middle' }}>{service.name}</td>
                    <td style={{ verticalAlign: 'middle' }}>{stripHtmlTags(service.description)}</td>
                    <td style={{ verticalAlign: 'middle' }}>{formatCurrency(service.price || 0)}</td>
                    <td style={{ verticalAlign: 'middle' }}>
                        <span className={`badge ${service.type === 'vip' ? 'bg-danger' : 'bg-secondary'}`}>
                            {service.type === 'vip' ? 'Dịch vụ VIP' : 'Dịch vụ thường'}
                        </span>
                    </td>
                    <td style={{ verticalAlign: 'middle', textAlign: 'center' }}>
                        {/* Hiển thị đánh giá với các ngôi sao */}
                        <div>
                            {[...Array(5)].map((star, index) => {
                                const value = index + 1;
                                return (
                                    <FaStar
                                        key={index}
                                        size={20}
                                        color={value <= service.averageRating ? '#ffc107' : '#e4e5e9'}
                                        style={{ marginRight: 4 }}
                                    />
                                );
                            })}
                        </div>
                        <div>
                            <Badge bg="info">{service.totalReviews} reviews</Badge>
                        </div>
                    </td>
                    <td style={{textAlign: 'center', verticalAlign: 'middle'}}>
                        {user.role === 'admin' && (
                            <Dropdown as={ButtonGroup}>
                                <Dropdown.Toggle variant="link" id="dropdown-basic">
                                    <FaListUl />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => openServiceModal(service)}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={() => {
                                        setServiceToDelete(service);
                                        setShowDeleteModal(true);
                                    }}>Delete</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        )}
                    </td>
                </tr>
            ))}
            </tbody>
        </Table>
    );
};

export default ServiceTable;
