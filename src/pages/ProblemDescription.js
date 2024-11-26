import React, { useState, useEffect } from 'react';
import { Box, Spinner, Alert, AlertIcon, Button, Heading, Text, HStack } from '@chakra-ui/react';
import { api } from '../services/api';
import { useParams, Link as RouterLink } from 'react-router-dom';

import ProblemHeader from '../components/ProblemHeader';
import ProblemBody from '../components/ProblemBody';
import SubmissionPanel from '../components/SubmissionPanel';
import SubmissionResult from '../components/SubmissionResult';

const ProblemDescription = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [bestSubmission, setBestSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bestSubmissionLoading, setBestSubmissionLoading] = useState(true);
    const [bestSubmissionError, setBestSubmissionError] = useState(null);

    useEffect(() => {
        const fetchProblemDetails = async () => {
            try {
                const detailResponse = await api.get(`/problem/detail/${id}`);
                setProblem(detailResponse.data.data);
            } catch (err) {
                setError('Failed to fetch problem details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        const fetchBestSubmission = async () => {
            try {
                const response = await api.get(`/userproblem?problemId=${id}`);
                setBestSubmission(response.data.data);
            } catch (err) {
                setBestSubmissionError('Failed to fetch the best submission.');
                console.error(err);
            } finally {
                setBestSubmissionLoading(false);
            }
        };

        fetchProblemDetails();
        fetchBestSubmission();
    }, [id]);

    if (loading) return <Box textAlign="center" mt={10}><Spinner size="xl" /></Box>;
    if (error) return <Alert status="error" mt={10}><AlertIcon />{error}</Alert>;

    return (
        <Box className="problem-container" p={4}>


            {/* Existing Problem Details */}
            <ProblemHeader detail={problem} />
            <Box mb={6}>
                {bestSubmissionLoading ? (
                    <Spinner size="md" />
                ) : bestSubmissionError ? (
                    <Alert status="error">
                        <AlertIcon />
                        {bestSubmissionError}
                    </Alert>
                ) : bestSubmission ? (
                    <HStack p={4} borderRadius="md">
                        <Text><strong>Best Result:</strong> </Text>
                        <SubmissionResult statusCode={bestSubmission.judgement} score={bestSubmission.score} />
                        {/* <Text><strong>Time:</strong> {bestSubmission.runTimeMs} ms</Text>
                        <Text><strong>Memory:</strong> {(bestSubmission.memoryByte / (1024 * 1024)).toFixed(2)} MB</Text> */}
                    </HStack>
                ) : (
                    <Text>Not tried</Text>
                )}
            </Box>
            <HStack>
                <Button
                    as={RouterLink}
                    to={`/problem/update/${id}`}
                    colorScheme="blue"
                    mb={4}
                >
                    Edit Problem
                </Button>
                <Button
                    as={RouterLink}
                    to={`/problem/stats/${id}`}
                    colorScheme="blue"
                    mb={4}
                >
                    Statistics
                </Button>
            </HStack>

            {/* Best Submission Section */}

            <Box className="problem-content" display="flex" flexDirection={['column', 'row']} mt={8}>
                <ProblemBody detail={problem} />
                <Box flex="1" ml={[0, 8]} mt={[8, 0]}>
                    <SubmissionPanel problemId={problem.problem.id} />
                </Box>
            </Box>
        </Box>
    );
};

export default ProblemDescription;