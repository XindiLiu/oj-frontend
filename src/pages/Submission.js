import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Heading,
    Text,
    Table,
    Thead,
    Tbody,
    Tr,
    Td,
    TableContainer,
    Alert,
    AlertIcon,
    Link,
    Spinner,
    Button,
} from '@chakra-ui/react';
import { api } from '../services/api';
import SubmissionPanel from '../components/SubmissionPanel';

const Submission = () => {
    const { id } = useParams();
    const [submission, setSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSubmission = async () => {
            try {
                const response = await api.get(`/submission/${id}`);
                setSubmission(response.data.data);
            } catch (err) {
                setError('Failed to fetch submission details.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchSubmission();
    }, [id]);

    if (loading) return <Box textAlign="center" mt={10}><Spinner size="xl" /></Box>;
    if (error) return <Alert status="error" mt={10}><AlertIcon />{error}</Alert>;

    return (
        <Box maxW="800px" mx="auto" p={4}>
            <Heading as="h1" size="xl" mb={4}>
                Submission {submission.id}
            </Heading>
            <Button
                as={RouterLink}
                to={`/problem/${submission.problem.id}`}
                colorScheme="teal"
                mb={4}
            >
                Back to Problem
            </Button>
            {/* TODO: Add problem id */}
            {/* <Text>
                <strong>Problem:</strong> <Link as={RouterLink} to={`/problem/${submission.problem.id}`} color="teal.500">{submission.problem.title}</Link>
            </Text> */}
            <Text color="gray.600" mb={4}>
                {submission.user.name} | {new Date(submission.createTime).toLocaleString()}
            </Text>

            <Box mb={6}>
                <TableContainer>
                    <Table variant="simple">
                        <Tbody>
                            <Tr>
                                <Td>Judgement</Td>
                                <Td>{submission.judgement}</Td>
                            </Tr>
                            <Tr>
                                <Td>Run Time</Td>
                                <Td>{submission.runTimeMs} ms</Td>
                            </Tr>
                            <Tr>
                                <Td>Memory Usage</Td>
                                <Td>{(submission.memoryByte / (1024 * 1024)).toFixed(2)} MB</Td>
                            </Tr>
                            <Tr>
                                <Td>Passed Test Cases</Td>
                                <Td>{submission.numPassedCases}/{submission.totalCases}</Td>
                            </Tr>
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>

            {submission.message && (
                <Box mb={6} p={4} borderWidth="1px" borderRadius="md" bg="gray.100">
                    <Text fontWeight="bold">Submission Message:</Text>
                    <Text as="pre" whiteSpace="pre-wrap">{submission.message}</Text>
                </Box>
            )}

            <Box>
                <Heading as="h2" size="md" mb={2}>
                    Code
                </Heading>
                <SubmissionPanel problemId={submission.problem.id} initCode={submission.code} initLanguage={submission.language} />
            </Box>
        </Box>
    );
};

export default Submission;