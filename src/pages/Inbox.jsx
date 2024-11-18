import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState('');

  useEffect(() => {
    // Retrieve the logged-in user's email
    const userEmail = localStorage.getItem('loggedInUser');
    setLoggedInUser(userEmail);

    // Fetch all messages and filter by the logged-in user's email
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    const userMessages = storedMessages.filter((message) => message.email === userEmail);
    setMessages(userMessages);
  }, []);

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center">
      <Helmet>
        <title>EquiLaw | Inbox</title>
      </Helmet>
      <div className="card w-11/12 bg-base-100 shadow-lg p-6 mt-10">
      <h2 className="mb-5 text-xl md:text-2xl lg:text-4xl font-extrabold font-Garamond text-center">Inbox</h2>

        {messages.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead className='text-base font-bold text-gray-300'>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {messages.map((message, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{message.subject}</td>
                    <td>{message.message}</td>
                    <td>
                      <span
                        className={`badge ${
                          message.status === 'Accepted'
                            ? 'badge-success'
                            : message.status === 'Rejected'
                            ? 'badge-error'
                            : 'badge-warning'
                        }`}
                      >
                        {message.status || 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-gray-500">You have no messages.</p>
        )}
      </div>
    </div>
  );
};

export default Inbox;
