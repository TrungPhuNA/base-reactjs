import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import './HomeCarousel.css';

const slides = [
    {
        img: 'https://www.petstation.vn/thumb/1366x660/1/upload/hinhanh/mo-hinh-giay-bang-tam-trang-len-y-tuong-thuyet-trinh-0242.png',
        title: 'Slide 1',
        description: 'Description for Slide 1',
    },
    {
        img: 'https://www.petstation.vn/thumb/1366x660/1/upload/hinhanh/z522189818509081f0cd62640b78d6e3a81b9ff4c7402c-3992.jpg',
        title: 'Slide 2',
        description: 'Description for Slide 2',
    },
    {
        img: 'https://www.petstation.vn/thumb/1366x660/1/upload/hinhanh/mo-hinh-giay-bang-tam-trang-len-y-tuong-thuyet-trinh-0242.png',
        title: 'Slide 3',
        description: 'Description for Slide 3',
    },
    // Thêm slide nếu cần
];

const HomeCarousel = () => {
    return (
        <Carousel className="carousel-fullscreen">
            {slides.map((slide, idx) => (
                <Carousel.Item key={idx}>
                    <img
                        className="d-block w-100"
                        src={slide.img}
                        alt={slide.title}
                    />
                    <Carousel.Caption>
                        <h3>{slide.title}</h3>
                        <p>{slide.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}
        </Carousel>
    );
};

export default HomeCarousel;
