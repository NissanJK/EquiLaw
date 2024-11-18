import React, { useEffect, useState } from 'react';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';

const ClientSays = () => {
    const slides = [
        {
            id: "slide1",
            imgSrc: "./images/banner.png",
            name: "Jawadul Karim",
            title: "Web Developer",
            testimonial: "EquiLaw law firm exceeded my expectations. They not only provided expert legal guidance, but they also made the entire process seamless and stress-free. Their professionalism and dedication to my case gave me peace of mind during a very challenging time.",
        },
        {
            id: "slide2",
            imgSrc: "./images/slider-1.jpg",
            name: "Tousif Ahmed",
            title: "Web Developer",
            testimonial: "Going through a divorce is never easy, but EquiLaw’s compassionate team made sure I felt supported throughout the entire process. They helped me with everything, from child custody arrangements to financial settlements. I felt like I had someone truly in my corner, advocating for what was best for me and my children.",
        },
        {
            id: "slide3",
            imgSrc: "./images/slider-2.jpg",
            name: "Abdullah Al Sakib",
            title: "Web Developer",
            testimonial: "The team at EquiLaw was instrumental in helping me navigate the complexities of setting up my business. Their business law expertise ensured that I was legally protected from day one. I couldn’t have asked for a more responsive and knowledgeable legal partner.",
        },
        {
            id: "slide4",
            imgSrc: "./images/slider-3.jpg",
            name: "Mohammad Iftikharul Alam",
            title: "Web Developer",
            testimonial: "I was facing serious charges, and the stakes couldn’t have been higher. EquiLaw’s criminal law team fought tirelessly for my case, and thanks to their expertise, I was acquitted. They were professional, supportive, and made sure I understood every step of the process. I’m forever grateful.",
        },
        {
            id: "slide5",
            imgSrc: "./images/closeup-gavel-judgement-concept.jpg",
            name: "Shariful Islam Junaed",
            title: "Web Developer",
            testimonial: "Dealing with a tax dispute can be overwhelming, but EquiLaw’s tax law team was incredible. They took the time to explain everything clearly and developed a plan that saved me from significant penalties. I highly recommend them to anyone needing help with complicated tax matters.",
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Function to change slides automatically
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, [slides.length]);

    // Handle manual navigation
    const handleNext = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    const handlePrev = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    return (
        <div>
            <section className="w-11/12 mx-auto my-7 md:my-10 lg:my-14">
                {/* Text */}
                <div className="text-center max-w-xs md:max-w-lg lg:max-w-2xl mx-auto my-7 md:my-10 lg:my-14">
                    <h1 className="mb-5 text-xl md:text-2xl lg:text-4xl font-extrabold font-Garamond">Hear from Our Clients</h1>
                    <p className="mb-5 text-gray-500 text-xs md:text-sm lg:text-base">
                        Our clients trust us to deliver exceptional legal services. Read their stories and discover why EquiLaw is the
                        preferred legal partner for individuals and businesses alike.
                    </p>
                </div>

                {/* Carousel */}
                <div className="relative">
                    <div className="carousel w-full bg-gradient-to-b from-slate-100 to-slate-800 overflow-hidden rounded-xl">
                        {slides.map((slide, index) => (
                            <div
                                key={slide.id}
                                className={`carousel-item w-full transition-transform duration-700 ease-in-out ${
                                    currentSlide === index ? "translate-x-0" : "translate-x-full"
                                }`}
                                style={{
                                    display: currentSlide === index ? "block" : "none",
                                    backgroundImage: `linear-gradient(to right, rgba(17, 17, 17, 1) 0%, rgba(17, 17, 17, 0) 50%, rgba(17, 17, 17, 1) 100%), url(${slide.imgSrc})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            >
                                <div className="hero min-h-screen opacity-90">
                                    <div className="hero-content text-neutral-content text-center">
                                        <div className="max-w-xs md:max-w-lg lg:max-w-2xl">
                                            <div className="avatar">
                                                <div className="w-24 rounded-full mb-5 border-2">
                                                    <img src="./images/superhero.png" alt={`${slide.name} avatar`} />
                                                </div>
                                            </div>
                                            <h1 className="text-2xl font-extrabold text-white font-Garamond">{slide.name}</h1>
                                            <p className="mb-5 text-gray-100 text-xs md:text-base">{slide.title}</p>
                                            <p className="mb-5 text-gray-100 text-xs md:text-sm lg:text-base">{slide.testimonial}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation buttons */}
                    <div className="absolute left-5 right-5 top-10 flex -translate-y-1/2 transform justify-between">
                        <button
                            className="btn btn-circle bg-transparent border-0 text-3xl text-white"
                            onClick={handlePrev}
                        >
                            <IoIosArrowDropleft />
                        </button>
                        <button
                            className="btn btn-circle bg-transparent border-0 text-3xl text-white"
                            onClick={handleNext}
                        >
                            <IoIosArrowDropright />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ClientSays;
