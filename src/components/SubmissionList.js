import React, { useEffect, useState, useContext } from 'react';
import {
    Box,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Spinner,
    Alert,
    AlertIcon,
    Text,
    Link,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';
import SubmissionResult from './SubmissionResult';
import PageSwitcher from './PageSwitcher';
import { useNavigate } from 'react-router-dom';
function SubmissionList({ id }) {
    const { user } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Pagination state
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();
    const fetchSubmissions = async (params = {}) => {
        try {
            const defaultParams = {
                pageNumber: 0,
                pageSize: 20,
            };
            const queryParams = new URLSearchParams({
                ...defaultParams,
                ...params,
            }).toString();
            const response = await api.get(`/user/${id}/submissions?${queryParams}`);
            setSubmissions(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
            setCurrentPage(response.data.data.number);
        } catch (error) {
            console.error('There was an error fetching the submissions!', error);
            setError('Failed to load submissions.');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchSubmissions({ pageNumber: newPage });
    };

    useEffect(() => {
        fetchSubmissions();
    }, [id]);

    if (loading) {
        return (
            <Box textAlign="center" mt={10}>
                <Spinner size="xl" />
            </Box>
        );
    }

    if (error) {
        return (
            <Alert status="error" mt={10}>
                <AlertIcon />
                {error}
            </Alert>
        );
    }

    if (!Array.isArray(submissions)) {
        return (
            <Box mt={10} textAlign="center">
                <Text>Unexpected data format received.</Text>
            </Box>
        );
    }

    if (submissions.length === 0) {
        return (
            <Box mt={10} textAlign="center">
                <Text>No submissions found.</Text>
            </Box>
        );
    }

    return (
        <Box overflowX="auto" mt={4}>
            <Table variant="striped" colorScheme="blue">
                <Thead>
                    <Tr>
                        <Th textAlign="center">Submission Time</Th>
                        <Th textAlign="center">Problem</Th>
                        <Th textAlign="center">Result</Th>
                        <Th textAlign="center">CPU Time</Th>
                        <Th textAlign="center">Language</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {submissions.map((submission) => (
                        <Tr key={submission.id} >
                            <Td>{new Date(submission.createTime).toLocaleString()}</Td>
                            <Td>
                                <Link as={RouterLink} to={`/problem/${submission.problem.id}`} color="teal.500">
                                    {submission.problem.title}
                                </Link>
                            </Td>
                            <Td>
                                <SubmissionResult statusCode={submission.judgement} score={submission.score} submissionId={submission.id} />
                            </Td>
                            <Td>{submission.runTimeMs ? `${submission.runTimeMs} ms` : '-'}</Td>
                            <Td>{submission.language}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            {/* Integrate the Updated PageSwitcher */}
            <PageSwitcher
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Box>
    );
}

export default SubmissionList;