import React from 'react';
import ProductCarousel from "../components/product/ProductCarousel";
import ServiceCards from "../components/service/ServiceCards";

const Home = () => {
    return (
        <>
            <ProductCarousel title={'Boss ăn nhanh'} />
            <ProductCarousel title={'Boss thời thượng'} />
            <ServiceCards />
        </>
    );
};

export default Home;
