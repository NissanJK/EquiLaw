import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function CaseManager() {
    const [cases, setCases] = useState([]);
    const [newCaseTitle, setNewCaseTitle] = useState('');
    const [newCaseDescription, setNewCaseDescription] = useState('');
    const [editCaseId, setEditCaseId] = useState(null);
    const [editCaseTitle, setEditCaseTitle] = useState('');
    const [editCaseDescription, setEditCaseDescription] = useState('');
    const navigate = useNavigate();
    // Load cases from localStorage on component mount
    useEffect(() => {
        const storedCases = JSON.parse(localStorage.getItem('cases')) || [];
        setCases(storedCases);
    }, []);

    // Save cases to localStorage whenever cases state updates
    useEffect(() => {
        localStorage.setItem('cases', JSON.stringify(cases));
    }, [cases]);

    const handleAddCase = () => {
        if (newCaseTitle.trim() && newCaseDescription.trim()) {
            const newCaseItem = { id: Date.now(), title: newCaseTitle, description: newCaseDescription };
            setCases([...cases, newCaseItem]);
            setNewCaseTitle('');
            setNewCaseDescription('');
        }
    };

    const handleDeleteCase = (id) => {
        const updatedCases = cases.filter((caseItem) => caseItem.id !== id);
        setCases(updatedCases);
    };

    const handleEditCase = (caseItem) => {
        setEditCaseId(caseItem.id);
        setEditCaseTitle(caseItem.title);
        setEditCaseDescription(caseItem.description);
    };

    const handleUpdateCase = () => {
        const updatedCases = cases.map((caseItem) =>
            caseItem.id === editCaseId ? { ...caseItem, title: editCaseTitle, description: editCaseDescription } : caseItem
        );
        setCases(updatedCases);
        setEditCaseId(null);
        setEditCaseTitle('');
        setEditCaseDescription('');
    };

    const handleBack = () => {
        navigate(-1); // Navigate to the previous page in the history stack
    };

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <Helmet>
                <title>EquiLaw | Cases Manager</title>
            </Helmet>

            <button
                className="btn btn-circle mb-4 text-4xl"
                onClick={handleBack} // Add functionality to go back
            >
                <IoArrowBackCircleOutline />
            </button>

            <h2 className="text-3xl font-bold text-center text-primary mb-8">Manage Cases</h2>

            {/* Add New Case */}
            <div className="card shadow-lg bg-base-100 p-6 mb-8">
                <input
                    type="text"
                    className="input input-bordered w-full mb-4"
                    placeholder="Case title"
                    value={newCaseTitle}
                    onChange={(e) => setNewCaseTitle(e.target.value)}
                />
                <textarea
                    className="textarea textarea-bordered w-full mb-4"
                    placeholder="Case description"
                    value={newCaseDescription}
                    onChange={(e) => setNewCaseDescription(e.target.value)}
                ></textarea>
                <button className="btn btn-primary w-full" onClick={handleAddCase}>Add Case</button>
            </div>

            {/* Case List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cases.map((caseItem) => (
                    <div key={caseItem.id} className="card shadow-lg bg-base-100 p-4">
                        <div className="card-body">
                            {editCaseId === caseItem.id ? (
                                <>
                                    <input
                                        type="text"
                                        className="input input-bordered w-full mb-4"
                                        placeholder="Edit title"
                                        value={editCaseTitle}
                                        onChange={(e) => setEditCaseTitle(e.target.value)}
                                    />
                                    <textarea
                                        className="textarea textarea-bordered w-full mb-4"
                                        placeholder="Edit description"
                                        value={editCaseDescription}
                                        onChange={(e) => setEditCaseDescription(e.target.value)}
                                    ></textarea>
                                    <div className="flex space-x-4">
                                        <button className="btn btn-primary" onClick={handleUpdateCase}>Update</button>
                                        <button className="btn btn-outline" onClick={() => setEditCaseId(null)}>Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <h3 className="card-title text-primary">{caseItem.title}</h3>
                                    <p>{caseItem.description}</p>
                                    <div className="flex space-x-4 mt-4">
                                        <button className="btn btn-secondary" onClick={() => handleEditCase(caseItem)}>Edit</button>
                                        <button className="btn btn-error" onClick={() => handleDeleteCase(caseItem.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CaseManager;
