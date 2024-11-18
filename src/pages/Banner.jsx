import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <div className="hero-content text-neutral-content text-center">
                <div className="max-w-xs md:max-w-lg lg:max-w-3xl">
                    <h1
                        className="mb-5 text-3xl md:text-5xl lg:text-7xl font-extrabold text-white font-Garamond">
                        We
                        Provide
                        Effective<br />Legal Solutions</h1>
                    <p className="mb-5 text-gray-100 text-xs md:text-sm lg:text-base">
                        With a team of seasoned legal professionals, we offer expert guidance across various
                        legal domains to help you navigate complex situations with confidence. Whether
                        you're dealing with a business dispute, family law issues, or criminal charges, our
                        attorneys are here to provide strategic advice and support.
                    </p>
                    <Link to="/contact" className="btn btn-outline font-black text-sm md:text-base lg:text-xl text-white">Contact Us</Link>
                </div>
            </div>
        </div>
    );
};

export default Banner;