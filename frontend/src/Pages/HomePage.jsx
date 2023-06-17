import React, { useEffect } from "react";

import Header from "../Layouts/HomePage/Header";
import Stats from '../Layouts/HomePage/ServiceStat'
import Newsletter from '../Layouts/HomePage/Newsletter'
import Testimonials from '../Layouts/HomePage/Reviews'
import FeaturedProperty from "../Layouts/HomePage/FeaturedProperty";

function Home() {
    useEffect(() => {
        document.title = "PropertyPro | Home";
    }, []);

    return (
        <>
            <Header />
            <Stats />
            <FeaturedProperty />
            <Testimonials />
            <Newsletter />
        </>
    );
}

export default Home;
