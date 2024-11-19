import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../utils/firebase.config';

function Cases() {
    const [cases, setCases] = useState([]);

    // Load cases from Firestore on component mount
    useEffect(() => {
        const caseCollectionRef = collection(db, 'cases');
        const unsubscribe = onSnapshot(caseCollectionRef, (snapshot) => {
            const casesData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setCases(casesData);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div className="p-6 bg-base-200 min-h-screen">
            <Helmet>
                <title>EquiLaw | Cases</title>
            </Helmet>
            <h2 className="mb-5 text-xl md:text-2xl lg:text-4xl font-extrabold font-Garamond text-center">Cases</h2>
            {cases.length > 0 ? (
                <div className="grid grid-cols-1 gap-6">
                    {cases.map((caseItem) => (
                        <div key={caseItem.id} className="card shadow-xl bg-base-100">
                            <div className="card-body">
                                <h3 className="card-title text-lg md:text-xl lg:text-2xl font-extrabold font-Garamond">
                                    {caseItem.title}
                                </h3>
                                <p className="text-gray-500 text-base md:text-lg lg:text-xl">{caseItem.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-base md:text-lg lg:text-xl">
                    No cases available at the moment.
                </p>
            )}
        </div>
    );
}

export default Cases;
