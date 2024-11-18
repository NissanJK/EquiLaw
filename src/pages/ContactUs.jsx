import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ContactUs = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });

    // Fetch the logged-in user's details from localStorage
    useEffect(() => {
        const loggedInEmail = localStorage.getItem('loggedInUser');
        const storedUser = loggedInEmail ? JSON.parse(localStorage.getItem(loggedInEmail)) : null;

        if (storedUser) {
            setUserDetails({
                name: storedUser.username.split('@')[0], // Extract name from email for simplicity
                email: loggedInEmail,
            });
        } else {
            toast.error('No logged-in user found. Please log in first.');
        }
    }, []);

    const handleSendMessage = () => {
        if (!subject || !message) {
            toast.error('Please fill in all fields.');
            return;
        }

        // Store the message in localStorage (for admin retrieval)
        const newMessage = {
            name: userDetails.name,
            email: userDetails.email,
            subject,
            message,
            status: 'pending',
        };
        const existingMessages = JSON.parse(localStorage.getItem('messages')) || [];
        localStorage.setItem('messages', JSON.stringify([...existingMessages, newMessage]));

        toast.success('Your message has been sent successfully!');
        setSubject('');
        setMessage('');
    };

    return (
        <div>
            <Helmet>
                <title>EquiLaw | Contact Us</title>
            </Helmet>
            <section className="md:px-16 lg:px-24 py-10">
                {/* Text Section */}
                <div className="text-center max-w-xs md:max-w-lg lg:max-w-2xl mx-auto my-7 md:my-10 lg:my-14">
                    <h1 className="mb-5 text-xl md:text-2xl lg:text-4xl font-extrabold font-Garamond">
                        Get in Touch with Us
                    </h1>
                    <p className="mb-5 text-gray-500 text-xs md:text-sm lg:text-base">
                        Need legal assistance? Reach out to our experienced team for prompt and professional support.
                        Whether you’re facing a legal challenge or just need advice, we’re here to help.
                    </p>
                </div>
                {/* Form Section */}
                <div className="w-11/12 mx-auto flex flex-col lg:flex-row gap-0 lg:gap-6">
                    <div className="grid grid-cols-2 w-full lg:w-1/2 gap-2 mb-8 lg:mb-0">
                        <div className="card bg-base-100 border text-neutral-content">
                            <figure>
                                <img src="./images/address.png" className="mt-5" alt="Address Icon" />
                            </figure>
                            <div className="card-body items-center text-center p-4">
                                <h2 className="card-title text-sm md:text-base lg:text-lg font-extrabold font-Garamond">Address</h2>
                                <p className="text-gray-500 text-xs md:text-sm lg:text-base">
                                    XYZ, Chattogram,
                                    <br />
                                    Bangladesh
                                </p>
                            </div>
                        </div>
                        <div className="card bg-base-100  border text-neutral-content">
                            <figure>
                                <img src="./images/call.png" className="mt-5" alt="Call Icon" />
                            </figure>
                            <div className="card-body items-center text-center p-4">
                                <h2 className="card-title text-sm md:text-base lg:text-lg font-extrabold font-Garamond">Call Us</h2>
                                <p className="text-gray-500 text-xs md:text-sm lg:text-base">+880 1712-072416</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 border text-neutral-content">
                            <figure>
                                <img src="./images/email.png" className="mt-5" alt="Email Icon" />
                            </figure>
                            <div className="card-body items-center text-center p-4">
                                <h2 className="card-title text-sm md:text-base lg:text-lg font-extrabold font-Garamond">Email Us</h2>
                                <p className="text-gray-500 text-xs md:text-sm lg:text-base">equilaw@gmail.com</p>
                            </div>
                        </div>
                        <div className="card bg-base-100 border text-neutral-content">
                            <figure>
                                <img src="./images/time.png" className="mt-5" alt="Working Hours Icon" />
                            </figure>
                            <div className="card-body items-center text-center p-4">
                                <h2 className="card-title text-sm md:text-base lg:text-lg font-extrabold font-Garamond">Working Hours</h2>
                                <p className="text-gray-500 text-xs md:text-sm lg:text-base">
                                    Mon-Fri: 9AM to 5PM
                                    <br />
                                    Sunday: 9AM to 1PM
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <input
                            type="text"
                            placeholder="Subject"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            className="input input-bordered w-full bg-neutral text-neutral-content"
                        />
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            className="textarea textarea-bordered w-full bg-neutral text-neutral-content my-6"
                            placeholder="Your Message"
                        />
                        <button
                            onClick={handleSendMessage}
                            className="btn btn-outline text-white font-semibold w-full"
                        >
                            Send Message
                        </button>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </div>
    );
};

export default ContactUs;
