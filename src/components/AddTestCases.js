import React, { useState, useContext, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    VStack,
    Alert,
    AlertIcon,
    Input,
    Spinner,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td, Flex
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { ProblemContext } from '../contexts/ProblemContext';
import { api } from '../services/api';

function AddTestCases({ problemId }) {
    const [error, setError] = useState('');
    const [testCases, setTestCases] = useState([]);
    const [file, setFile] = useState(null);
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const fetchTestCases = async () => {
        try {
            const response = await api.get(`/problem/${problemId}/testCases`);
            const testcases = response.data.data;
            setTestCases(testcases);
        } catch (err) {
            console.error('Error fetching problem data:', err);
            setError('Failed to load problem data.');
        }
    };

    useEffect(() => {
        fetchTestCases();
    }, [problemId]);

    const handleSubmit = async () => {
        setError('');
        setSuccess('');
        setLoading(true);

        if (!file) {
            setError('Please select one file to upload.');
            setLoading(false);
            return;
        }

        try {
            const formData = new FormData();
            formData.append('testCaseZipFile', file);
            const response = await api.post(`/problem/${problemId}/testCases`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setSuccess(`Successfully uploaded ${response.data.data.length} test cases`);
            fetchTestCases();
            // Optionally, reset the context or navigate away
            // For example, navigate to the problem list page
        } catch (error) {
            console.error('Error submitting problem with test cases:', error);
            setError('Failed to submit problem and test cases.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="600px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <Heading as="h2" size="lg" mb={4} textAlign="center">
                Upload Test Cases
            </Heading>
            <VStack spacing={4}>
                {success && (
                    <Alert status="success">
                        <AlertIcon />
                        {success}
                    </Alert>
                )}
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                {loading && (
                    <Flex align="center">
                        <Spinner size="md" mr={2} />
                        <Text>Uploading test cases...</Text>
                    </Flex>
                )}
                <Text fontSize="sm" color="gray.500" mb={2}>
                    Requirements:
                    <ul>
                        <li>The test data must be compressed in a zip file</li>
                        <li>All test cases must be in the first level of the zip file.</li>
                        <li>Input and output files must appear in pairs, with extensions .in and .out respectively.</li>
                        <li>No subdirectories or irrelevant files should be in the zip file.</li>
                    </ul>
                </Text>
                <FormControl id="testCases" isRequired>
                    <FormLabel>Upload File</FormLabel>
                    <Input
                        type="file"
                        accept=".zip"
                        onChange={handleFileChange}
                        disabled={loading}
                    />
                    <Button onClick={handleSubmit} isLoading={loading} loadingText="Submitting">
                        Submit
                    </Button>
                    <Text fontSize="sm" color="gray.500" mb={2}>
                        Reuploading will replace the current test cases.
                    </Text>
                </FormControl>
                {testCases.length > 0 && (
                    <Table variant="striped" colorScheme="blue" size="sm">
                        <Thead>
                            <Tr>
                                <Th textAlign="center">#</Th>
                                <Th textAlign="center">Input File</Th>
                                <Th textAlign="center">Output File</Th>
                                {/* <Th textAlign="center">Weight</Th> */}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {testCases.map((submission, index) => (
                                <Tr key={submission.name}>
                                    <Td textAlign="left">{index + 1}</Td>
                                    <Td textAlign="left">{submission.name}.in</Td>
                                    <Td textAlign="left">{submission.name}.out</Td>
                                    {/* <Td textAlign="center">{submission.weight}</Td> */}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                )}
            </VStack>
        </Box>
    );
}

export default AddTestCases;