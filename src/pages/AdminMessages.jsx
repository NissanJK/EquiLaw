import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { collection, onSnapshot, updateDoc, doc, orderBy,query } from 'firebase/firestore';
import { db } from '../utils/firebase.config';
import 'react-toastify/dist/ReactToastify.css';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [adminReply, setAdminReply] = useState('');
    const navigate = useNavigate();

    // Fetch all messages
    useEffect(() => {
        const messagesQuery = query(collection(db, 'contactMessages'), orderBy('timestamp', 'asc'));
        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
            const fetchedMessages = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setMessages(fetchedMessages);
        });

        return () => unsubscribe();
    }, []);

    const handleReply = async () => {
        if (!adminReply.trim() || !selectedMessage) {
            toast.error('Please enter a reply and select a message.');
            return;
        }

        try {
            const messageDoc = doc(db, 'contactMessages', selectedMessage.id);
            await updateDoc(messageDoc, { response: adminReply });
            setAdminReply('');
            toast.success('Reply sent successfully!');
        } catch (error) {
            console.error('Error sending reply:', error);
            toast.error('Failed to send reply. Please try again.');
        }
    };

    return (
        <div className="p-5 min-h-screen bg-base-200">
            <Helmet>
                <title>EquiLaw | Admin Messages</title>
            </Helmet>
            <button className="btn btn-circle mb-4 text-4xl" onClick={() => navigate(-1)}>
                <IoArrowBackCircleOutline />
            </button>
            <h1 className="text-2xl font-bold mb-5">User Messages</h1>

            {/* Messages List */}
            <div className="flex flex-col gap-4">
                {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`p-4 border rounded cursor-pointer ${
                            selectedMessage?.id === msg.id ? 'bg-gray-300 text-gray-700' : ''
                        }`}
                        onClick={() => setSelectedMessage(msg)}
                    >
                        <p><strong>User Email:</strong> {msg.email}</p>
                        <p><strong>Subject:</strong> {msg.subject}</p>
                        <p><strong>Message:</strong> {msg.message}</p>
                        {msg.response && (
                            <p className="text-green-600"><strong>Response:</strong> {msg.response}</p>
                        )}
                    </div>
                ))}
            </div>

            {/* Reply Section */}
            {selectedMessage && (
                <div className="mt-5 p-4 border-t">
                    <h2 className="text-xl font-bold mb-3">Reply to: {selectedMessage.email}</h2>
                    <textarea
                        value={adminReply}
                        onChange={(e) => setAdminReply(e.target.value)}
                        className="textarea textarea-bordered w-full mb-3"
                        placeholder="Your Reply"
                    />
                    <button className="btn btn-primary w-full" onClick={handleReply}>
                        Send Reply
                    </button>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default AdminMessages;
