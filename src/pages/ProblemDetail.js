import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { api } from '../services/api';
import {
    Box,
    Heading,
    Text,
    Button,
    Spinner,
    Alert,
    AlertIcon,
    Select,
    Textarea,
} from '@chakra-ui/react';

function ProblemDetail() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('CPP');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get(`/problem/${id}`)
            .then(response => {
                setProblem(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching problem details!', error);
                setError('Failed to load problem details.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        api.post(`/problem/${id}/submit`, { code, language })
            .then(response => {
                setResult(response.data.data);
            })
            .catch(error => {
                console.error('Error submitting solution!', error);
                setError('Failed to submit solution.');
            });
    };

    if (loading) return <Box textAlign="center" mt={10}><Spinner size="xl" /></Box>;
    if (error) return <Alert status="error" mt={10}><AlertIcon />{error}</Alert>;

    return (
        <Box maxW="800px" mx="auto" p={4}>
            <Heading as="h2" size="xl" mb={4} textAlign="center">
                {problem.title}
            </Heading>
            <Button
                as={RouterLink}
                to={`/problem/update/${id}`}
                colorScheme="teal"
                mb={4}
                alignSelf="center"
            >
                Edit Problem
            </Button>
            <Text mb={4}>{problem.description}</Text>
            {/* Display other problem details as needed */}

            <Heading as="h3" size="lg" mt={8} mb={4}>
                Submit Your Solution
            </Heading>
            <Box as="form" onSubmit={handleSubmit}>
                <Box mb={4}>
                    <Text mb={2}>Language:</Text>
                    <Select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        placeholder="Select language"
                    >
                        <option value="CPP">C++</option>
                        <option value="C">C</option>
                        {/* Add other languages as needed */}
                    </Select>
                </Box>
                <Box mb={4}>
                    <Text mb={2}>Code:</Text>
                    <Textarea
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Write your solution here..."
                        size="md"
                        minH="300px"
                        required
                    />
                </Box>
                <Button type="submit" colorScheme="blue" isDisabled={code.trim() === ''}>
                    Submit
                </Button>
            </Box>

            {result && (
                <Box mt={6} p={4} borderWidth="1px" borderRadius="lg" bg="gray.50">
                    <Heading as="h3" size="md" mb={2}>
                        Submission Result
                    </Heading>
                    <Text><strong>Status:</strong> {result.status}</Text>
                    <Text><strong>Judgement:</strong> {result.judgement}</Text>
                    <Text><strong>Run Time:</strong> {result.runTimeMs} ms</Text>
                    <Text><strong>Memory:</strong> {result.memoryByte} bytes</Text>
                    {/* Display other result details */}
                </Box>
            )}
        </Box>
    );
}

export default ProblemDetail;