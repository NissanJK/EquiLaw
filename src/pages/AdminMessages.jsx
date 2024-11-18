import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminMessages = () => {
    const [messages, setMessages] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        setMessages(storedMessages);
    }, []);

    const updateMessageStatus = (index, newStatus) => {
        const updatedMessages = [...messages];

        // Prevent status change if already Accepted/Rejected
        if (updatedMessages[index].status === 'Accepted' || updatedMessages[index].status === 'Rejected') {
            toast.error(`Message already ${updatedMessages[index].status}.`);
            return;
        }

        // Update the status
        updatedMessages[index].status = newStatus;

        // Save to localStorage
        localStorage.setItem('messages', JSON.stringify(updatedMessages));
        setMessages(updatedMessages);

        toast.success(`Message has been ${newStatus.toLowerCase()}!`);
    };

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page in the history stack
    };

    return (
        <div className="p-5 min-h-screen bg-base-200">
            <Helmet>
                <title>EquiLaw | Messages</title>
            </Helmet>
            <button
                className="btn btn-circle mb-4 text-4xl"
                onClick={handleBack} // Add functionality to go back
            >
                <IoArrowBackCircleOutline />
            </button>
            <h1 className="text-2xl font-bold mb-5">User Messages</h1>
            <div className="overflow-x-auto">
                {messages.length === 0 ? (
                    <p>No messages found.</p>
                ) : (
                    <table className="table w-full border-collapse border border-gray-200">
                        <thead className='font-bold text-base text-gray-300'>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2 text-center">Name</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Email</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Subject</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Message</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Status</th>
                                <th className="border border-gray-300 px-4 py-2 text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {messages.map((msg, index) => (
                                <tr key={index}>
                                    <td className="border border-gray-300 px-4 py-2">{msg.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">{msg.email}</td>
                                    <td className="border border-gray-300 px-4 py-2">{msg.subject}</td>
                                    <td className="border border-gray-300 px-4 py-2">{msg.message}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <span
                                            className={`badge ${msg.status === 'Accepted'
                                                ? 'badge-success'
                                                : msg.status === 'Rejected'
                                                    ? 'badge-error'
                                                    : 'badge-warning'
                                                }`}
                                        >
                                            {msg.status || 'Pending'}
                                        </span>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2 lg:space-x-5 space-y-2 lg:space-y-0">
                                        <button
                                            className="btn btn-success btn-xs"
                                            onClick={() => updateMessageStatus(index, 'Accepted')}
                                            disabled={msg.status === 'Accepted' || msg.status === 'Rejected'}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="btn btn-error btn-xs"
                                            onClick={() => updateMessageStatus(index, 'Rejected')}
                                            disabled={msg.status === 'Accepted' || msg.status === 'Rejected'}
                                        >
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default AdminMessages;
