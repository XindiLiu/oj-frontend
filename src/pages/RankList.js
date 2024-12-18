import React, { useState, useEffect, useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Spinner,
    Alert,
    AlertIcon,
    Link,
} from '@chakra-ui/react';
import { api } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

const RankList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        const fetchRank = async () => {
            try {
                const response = await api.get('/user/rank');
                setUsers(response.data.data);
            } catch (error) {
                console.error('Error fetching user rank:', error);
                setError('Failed to load user rankings.');
            } finally {
                setLoading(false);
            }
        };

        fetchRank();
    }, []);

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

    return (
        <Box maxW="800px" mx="auto" mt={10} p={4}>
            <Heading as="h2" size="lg" mb={6} textAlign="center">
                User Rankings
            </Heading>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Rank</Th>
                        <Th>User</Th>
                        <Th>Score</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {users.map((user, index) => (
                        <Tr key={user.id}>
                            <Td>{index + 1}</Td>
                            <Td>
                                <Link as={RouterLink} to={`/user/${user.id}`} color="teal.500">
                                    {user.displayName}
                                </Link>
                            </Td>
                            <Td>{user.score}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </Box>
    );
};

export default RankList;

