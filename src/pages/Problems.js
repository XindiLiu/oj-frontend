import React, { useState, useEffect } from 'react';
import { Box, Spinner, Alert, AlertIcon, Heading } from '@chakra-ui/react';
import { api } from '../services/api';
import ProblemList from '../components/ProblemList';
import ProblemSearch from '../components/ProblemSearch';
import PageSwitcher from '../components/PageSwitcher';
const Problems = () => {
    const [problems, setProblems] = useState([]);
    const [searchParams, setSearchParams] = useState({
        title: '',
        minDifficulty: '',
        maxDifficulty: '',
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const fetchProblems = async (params = {}) => {
        try {
            const defaultParams = {
                pageNumber: 0,
                pageSize: 20,
            };
            const queryParams = new URLSearchParams({
                ...defaultParams,
                ...params,
            }).toString();
            const response = await api.get(`/problem/page?${queryParams}`);
            setProblems(response.data.data.content);
            setTotalPages(response.data.data.totalPages);
            setCurrentPage(response.data.data.number);

        } catch (error) {
            console.error('There was an error fetching the problems!', error);
            setError('Failed to load problems.');
        } finally {
            setLoading(false);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        fetchProblems({ pageNumber: newPage });
    };

    useEffect(() => {
        fetchProblems();
    }, []);

    const handleSearch = (newParams) => {
        setSearchParams(newParams);
        setLoading(true);
        fetchProblems(newParams);
    };

    if (loading) return <Box textAlign="center" mt={10}><Spinner size="xl" /></Box>;
    if (error) return <Alert status="error" mt={10}><AlertIcon />{error}</Alert>;

    return (
        <Box maxW="1200px" mx="auto" p={4}>
            <Heading as="h1" size="xl" mb={6} textAlign="center">
                Problems
            </Heading>
            <ProblemSearch onSearch={handleSearch} />
            <ProblemList problems={problems} />
            <PageSwitcher currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </Box>
    );
};

export default Problems;