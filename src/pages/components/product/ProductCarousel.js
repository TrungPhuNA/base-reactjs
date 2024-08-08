import React, {useEffect} from 'react';
import {Carousel, Card, Button, Container, Row, Col, Nav} from 'react-bootstrap';
import './ProductCarousel.css';
import {Link} from "react-router-dom";

const products = [
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/thit-ga2780_560x560.jpg',
        title: 'Bánh thưởng cho chó vị thịt gà JERHIGH Chicken Jerky',
        price: '49.000vnđ',
        status: 'Tạm hết hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/ga-ca-rot2738_560x560.jpg',
        title: 'Bánh thưởng cho chó vị cà rốt JERHIGH Carrot Sticks',
        price: '49.000vnđ',
        status: 'Tạm hết hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/bacon4841_560x560.jpg',
        title: 'Bánh thưởng cho chó vị thịt xông khói JERHIGH Bacon',
        price: '49.000vnđ',
        status: 'Tạm hết hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/wanpy-xot-kem-thuong-vi-ga-70gr2144_560x560.png',
        title: 'WANPY XỐT KEM THƯỞNG CHO MÈO 70G',
        price: '29.000vnđ',
        status: 'Còn hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/pate-moochiee6243_560x560.png',
        title: 'Thức ăn cho mèo Moochie',
        price: '19.000vnđ',
        status: 'Còn hàng',
    },
    {
        img: 'https://www.petstation.vn/thumbsp/560x560/1/upload/sanpham/lapaw-375g1861_560x560.jpg',
        title: 'Pate Mèo Mọi Lứa Tuổi LaPaw 375g',
        price: '65.000vnđ',
        status: 'Còn hàng',
    },
];

const chunkArray = (array, size) => {
    const chunked = [];
    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }
    return chunked;
};

const ProductCarousel = (props) => {
    const [title, setTitle] = React.useState('');
    const productChunks = chunkArray(products, 6);
    console.info("===========[] ===========[] : ",props);
    useEffect(() => {
        setTitle(props.title)
    }, []);
    return (
        <Container>
            <div className={'carousel-title'}>
                <h2 className="text-center my-4">{title}</h2>
            </div>
            <p className="text-center mb-4">Các loại hạt, pate, bánh thưởng thơm ngon, bổ dưỡng cho Boss</p>
            <Carousel>
                {productChunks.map((productChunk, idx) => (
                    <Carousel.Item key={idx}>
                        <Row>
                            {productChunk.map((product, idx) => (
                                <Col key={idx} md={2} className="d-flex align-items-stretch item-prod">
                                    <Card className="mb-3 card-prod">
                                        <Card.Img variant="top" src={product.img} />
                                        <Card.Body>
                                            <Card.Title>
                                                <Nav.Link as={Link} to="/">{product.title}</Nav.Link>
                                            </Card.Title>
                                            <Card.Text>{product.price}</Card.Text>
                                        </Card.Body>
                                        <Button variant={product.status === 'Còn hàng' ? 'success' : 'danger'}>
                                            {product.status}
                                        </Button>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Carousel.Item>
                ))}
            </Carousel>
        </Container>
    );
};

export default ProductCarousel;
