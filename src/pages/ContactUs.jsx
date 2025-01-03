import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Swal from 'sweetalert2';
import { collection, addDoc, onSnapshot, query, where, orderBy, deleteDoc, getDocs } from 'firebase/firestore';
import { auth, db } from '../utils/firebase.config';
import 'sweetalert2/dist/sweetalert2.min.css';

const ContactUs = () => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [userDetails, setUserDetails] = useState({ name: '', email: '' });
    const userEmail = auth.currentUser?.email;

    useEffect(() => {
        if (!userEmail) {
            Swal.fire('Error', 'No logged-in user found. Please log in first.', 'error');
            return;
        }

        setUserDetails({
            name: auth.currentUser.displayName || userEmail.split('@')[0],
            email: userEmail,
        });

        const userMessagesQuery = query(
            collection(db, 'contactMessages'),
            where('email', '==', userEmail),
            orderBy('timestamp', 'asc')
        );
        const unsubscribe = onSnapshot(userMessagesQuery, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [userEmail]);

    const handleSendMessage = async () => {
        if (!subject || !message) {
            Swal.fire('Error', 'Please fill in all fields.', 'error');
            return;
        }

        try {
            await addDoc(collection(db, 'contactMessages'), {
                name: userDetails.name,
                email: userDetails.email,
                subject,
                message,
                timestamp: new Date(),
                response: '', 
            });

            Swal.fire('Success', 'Your message has been sent successfully!', 'success');
            setSubject('');
            setMessage('');
        } catch (error) {
            console.error('Error sending message:', error);
            Swal.fire('Error', 'Failed to send your message. Please try again.', 'error');
        }
    };

    const handleClearMessages = async () => {
        if (!userEmail) {
            Swal.fire('Error', 'No logged-in user found.', 'error');
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action will clear all your messages and replies, and it cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete all!',
            cancelButtonText: 'Cancel',
        });

        if (!result.isConfirmed) return;

        try {
            const userMessagesQuery = query(
                collection(db, 'contactMessages'),
                where('email', '==', userEmail)
            );
            const querySnapshot = await getDocs(userMessagesQuery);

            const deletePromises = querySnapshot.docs.map((doc) => deleteDoc(doc.ref));
            await Promise.all(deletePromises);

            setMessages([]);
            Swal.fire('Success', 'All messages and replies have been cleared.', 'success');
        } catch (error) {
            console.error('Error clearing messages:', error);
            Swal.fire('Error', 'Failed to clear messages. Please try again.', 'error');
        }
    };

    return (
        <div>
            <Helmet>
                <title>EquiLaw | Contact Us</title>
            </Helmet>
            <section className="p-5 lg:flex w-11/12 mx-auto justify-between gap-8">
                <div className='lg:w-1/2'>
                    <h1 className="text-2xl font-bold mb-5">Contact Us</h1>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="input input-bordered w-full mb-3"
                    />
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="textarea textarea-bordered w-full mb-3"
                        placeholder="Your Message"
                    />
                    <button className="btn btn-primary w-full mb-3" onClick={handleSendMessage}>
                        Send Message
                    </button>
                </div>
                <div className="mt-5 lg:mt-0 lg:w-1/2">
                    <h2 className="text-2xl font-bold mb-5">Messages Sent</h2>
                    
                    {messages.length > 0 ? (
                        messages.map((msg) => (
                            <div key={msg.id} className="mb-4 p-3 border rounded">
                                <p><strong>Subject:</strong> {msg.subject}</p>
                                <p><strong>Message:</strong> {msg.message}</p>
                                {msg.response ? (
                                    <p className="text-green-600">
                                        <strong>Response:</strong> {msg.response}
                                    </p>
                                ) : (
                                    <p className="text-gray-500">
                                        <strong>Awaiting Response</strong>
                                    </p>
                                )}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">You have no messages.</p>
                    )}
                    <button className="btn btn-danger w-full mt-5" onClick={handleClearMessages}>
                        Clear All Messages and Replies
                    </button>
                </div>

            </section>
        </div>
    );
};

export default ContactUs;
