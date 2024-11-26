// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Box, Heading, Spinner, Alert, AlertIcon } from '@chakra-ui/react';
import { api } from '../services/api';
import ProblemList from '../components/ProblemList';

function Home() {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.get('/problem/page?pageNumber=1&pageSize=10')
            .then(response => {
                setProblems(response.data.data.content);
            })
            .catch(error => {
                console.error('There was an error fetching the problems!', error);
                setError('Failed to load problems.');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <Box textAlign="center" mt={10}><Spinner size="xl" /></Box>;
    if (error) return <Alert status="error" mt={10}><AlertIcon />{error}</Alert>;

    return (
        <Box maxW="1200px" mx="auto" p={4}>
            <Heading as="h1" size="xl" mb={6} textAlign="center">
                Reading List Problems
            </Heading>
            <ProblemList problems={problems} />
        </Box>
    );
}

export default Home;