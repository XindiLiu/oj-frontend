import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Select, Input, Text, FormControl, FormLabel, VStack, HStack, Spinner } from '@chakra-ui/react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
// Import language modes as needed
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import CodeEditor from './CodeEditor';
const LanguageSelect = ({ selectedLanguage, onChange }) => (
    <FormControl id="language" mb={4}>
        <FormLabel>Language:</FormLabel>
        <Select value={selectedLanguage} onChange={onChange}>
            <option value="JAVA">Java</option>
            <option value="PYTHON">Python</option>
            <option value="CPP">C++</option>
            <option value="C">C</option>
            {/* Add more languages as needed */}
        </Select>
    </FormControl>
);

LanguageSelect.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

const SubmissionPanel = ({ problemId, initCode, initLanguage }) => {
    const [code, setCode] = useState(initCode);
    const [language, setLanguage] = useState(initLanguage);
    const [submissionMessage, setSubmissionMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [fileName, setFileName] = useState('');

    const navigate = useNavigate();

    const handleLanguageChange = (e) => {
        setLanguage(e.target.value);
    };

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCode(e.target.result);
                setFileName(file.name);
            };
            reader.readAsText(file);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmissionMessage('');

        const submissionDTO = {
            code,
            language,
            fileName,
        };

        try {
            const response = await api.post(`/problem/${problemId}/submit`, submissionDTO);
            if (response.data.success) {
                setSubmissionMessage('Submission successful!');
                const submissionId = response.data.data.id;
                navigate(`/submission/${submissionId}`);
            } else {
                setSubmissionMessage('Submission failed. Please try again.');
            }
        } catch (error) {
            setSubmissionMessage('An error occurred during submission.');
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const modeMap = {
        'JAVA': 'text/x-java',
        'PYTHON': 'python',
        'CPP': 'text/x-c++src',
        'C': 'text/x-c',
        'JAVASCRIPT': 'javascript',
        // Add more mappings as needed
    };

    return (
        <Box className="submission-panel" borderWidth="1px" borderRadius="lg" p={4} bg="gray.50">
            <VStack spacing={4} align="stretch">
                <FormLabel fontSize="lg">Submit Solution</FormLabel>
                <LanguageSelect selectedLanguage={language} onChange={handleLanguageChange} />

                <Box borderWidth="1px" borderRadius="md" overflow="hidden">
                    <CodeEditor
                        language={language}
                        code={code}
                        onCodeChange={setCode}
                    />
                </Box>

                <HStack spacing={4}>
                    <Button onClick={handleSubmit} colorScheme="blue" isLoading={isSubmitting} isDisabled={code.trim() === ''}>
                        Submit
                    </Button>

                    <Button as="label" htmlFor="fileInput" colorScheme="blue">
                        Upload File
                        <Input
                            type="file"
                            id="fileInput"
                            accept=".java,.py,.cpp,.c"
                            onChange={handleFileUpload}
                            display="none"
                        />
                    </Button>
                </HStack>

                {fileName && <Text>Uploaded File: {fileName}</Text>}
                {submissionMessage && <Text color="green.500">{submissionMessage}</Text>}
            </VStack>
        </Box>
    );
};

SubmissionPanel.defaultProps = {
    initCode: '',
    initLanguage: 'CPP',
};

SubmissionPanel.propTypes = {
    problemId: PropTypes.number.isRequired,
    initCode: PropTypes.string,
    initLanguage: PropTypes.string,
};

export default SubmissionPanel;