import React, { useState, useEffect } from 'react';
import {
    Box,
    Spinner,
    Alert,
    AlertIcon,
    Button,
    Heading,
    Text,
    HStack,
    Select,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
} from '@chakra-ui/react';
import { api } from '../services/api';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { useContext } from 'react';
import ProblemHeader from '../components/ProblemHeader';
import ProblemBody from '../components/ProblemBody';
import SubmissionPanel from '../components/SubmissionPanel';
import SubmissionResult from '../components/SubmissionResult';
import LanguageSelect from '../components/LanguageSelect';
import { AuthContext } from '../contexts/AuthContext';
import UserLink from '../components/UserLink';
const ProblemStats = () => {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [bestSubmission, setBestSubmission] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [bestSubmissionLoading, setBestSubmissionLoading] = useState(true);
    const [bestSubmissionError, setBestSubmissionError] = useState(null);

    // New states for language selection and submissions
    const [languages, setLanguages] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('CPP');
    const [rankedSubmissions, setRankedSubmissions] = useState([]);
    const [rankedLoading, setRankedLoading] = useState(false);
    const [rankedError, setRankedError] = useState(null);
    const { user, setUser } = useContext(AuthContext);

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

    useEffect(() => {
        if (selectedLanguage) {
            const fetchRankedSubmissions = async () => {
                setRankedLoading(true);
                setRankedError(null);
                try {
                    const response = await api.get(
                        `/problem/time_ranklist/${id}?language=${selectedLanguage}`
                    );
                    const submissions = response.data.data;
                    // Sort submissions by runtime (ascending)
                    submissions.sort((a, b) => a.runTimeMs - b.runTimeMs);
                    setRankedSubmissions(submissions);
                } catch (err) {
                    setRankedError('Failed to fetch ranked submissions.');
                    console.error(err);
                } finally {
                    setRankedLoading(false);
                }
            };

            fetchRankedSubmissions();
        }
    }, [id, selectedLanguage]);

    if (loading)
        return (
            <Box textAlign="center" mt={10}>
                <Spinner size="xl" />
            </Box>
        );
    if (error)
        return (
            <Alert status="error" mt={10}>
                <AlertIcon />
                {error}
            </Alert>
        );

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
                        <Text>
                            <strong>Best Result:</strong>{' '}
                        </Text>
                        <SubmissionResult
                            statusCode={bestSubmission.status}
                            score={bestSubmission.highestScore}
                            submissionId={bestSubmission.submissionId}
                        />
                    </HStack>
                ) : (
                    <Text>Not tried</Text>
                )}
            </Box>
            <HStack spacing={4} mb={4}>
                <Button
                    as={RouterLink}
                    to={`/problem/update/${id}`}
                    colorScheme="blue"
                >
                    Edit Problem
                </Button>
                <Button
                    as={RouterLink}
                    to={`/problem/${id}`}
                    colorScheme="blue"
                >
                    Back to Problem
                </Button>
            </HStack>

            {/* Ranked Submissions Section */}
            <Box mt={8}>
                <Heading size="md" mb={4}>
                    Fastest Submissions by Language
                </Heading>
                <LanguageSelect
                    selectedLanguage={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                />

                {rankedLoading ? (
                    <Spinner size="lg" />
                ) : rankedError ? (
                    <Alert status="error">
                        <AlertIcon />
                        {rankedError}
                    </Alert>
                ) : rankedSubmissions.length > 0 ? (
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>Rank</Th>
                                <Th>User</Th>
                                <Th>Time</Th>
                                <Th>Memory</Th>
                                <Th>Submission Time</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {rankedSubmissions.map((submission, index) => (
                                <Tr key={submission.id}>
                                    <Td>{index + 1}</Td>
                                    <Td> <UserLink user={submission.user} /> </Td>
                                    <Td>{submission.runTimeMs} ms
                                    </Td>
                                    <Td>
                                        {(submission.memoryByte / (1024 * 1024)).toFixed(2)} MB
                                    </Td>
                                    <Td>
                                        {new Date(submission.createTime).toLocaleString()}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                ) : (
                    <Text>No submissions found.</Text>
                )}
            </Box>
        </Box>
    );
};

export default ProblemStats;