import React, { createContext, useState } from 'react';

export const ProblemContext = createContext();

export const ProblemProvider = ({ children }) => {
    const [problemDetails, setProblemDetails] = useState({
        title: '',
        difficulty: '',
        visibility: 'PUBLIC',
        description: '',
        inputFormat: '',
        outputFormat: '',
        sampleData: '',
        timeLimitSeconds: '',
        memoryLimitMB: '',
    });

    const [testCases, setTestCases] = useState([]);

    return (
        <ProblemContext.Provider value={{
            problemDetails,
            setProblemDetails,
            testCases,
            setTestCases,
        }}>
            {children}
        </ProblemContext.Provider>
    );
};