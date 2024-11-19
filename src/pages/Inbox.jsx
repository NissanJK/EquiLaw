import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { toast, ToastContainer } from 'react-toastify';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../utils/firebase.config';
import 'react-toastify/dist/ReactToastify.css';

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [userDetails, setUserDetails] = useState({ email: '' });

    // Fetch the logged-in user's email
    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            setUserDetails({ email: user.email });
        } else {
            toast.error('No logged-in user found. Please log in first.');
        }
    }, []);

    // Fetch messages sent by the logged-in user
    useEffect(() => {
        if (!userDetails.email) return;

        const messagesQuery = query(
            collection(db, 'contactMessages'),
            where('email', '==', userDetails.email)
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, [userDetails.email]);

    return (
        <div className="p-5 min-h-screen bg-base-200">
            <Helmet>
                <title>EquiLaw | My Messages</title>
            </Helmet>
            <h1 className="text-2xl font-bold mb-5">My Messages</h1>

            {/* Messages List */}
            <div className="flex flex-col gap-4">
                {messages.length === 0 ? (
                    <p className="text-gray-500 text-center">No messages yet.</p>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className="p-4 border rounded bg-base-100">
                            <h2 className="text-lg font-semibold">Subject: {msg.subject}</h2>
                            <p className="mb-2">
                                <strong>Your Message:</strong> {msg.message}
                            </p>
                            {msg.response ? (
                                <p className="text-green-600">
                                    <strong>Admin Reply:</strong> {msg.response}
                                </p>
                            ) : (
                                <p className="text-gray-500">Awaiting admin response...</p>
                            )}
                            <p className="text-xs text-gray-400 mt-2">
                                Sent on: {new Date(msg.timestamp?.toDate()).toLocaleString()}
                            </p>
                        </div>
                    ))
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Inbox;
