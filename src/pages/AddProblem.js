import React from 'react';
import ProblemForm from '../components/ProblemForm';
import { Box, Heading } from '@chakra-ui/react';
function AddProblem() {
    return (
        <Box maxW="1000px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <Heading as="h2" size="lg" mb={4} textAlign="center">
                Create a New Problem
            </Heading>
            <ProblemForm mode="add" />
        </Box>
    );
}

export default AddProblem;