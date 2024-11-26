import React from 'react';
import { Box, Heading, Text, Table, Thead, Tbody, Tr, Td } from '@chakra-ui/react';

const ProblemHeader = ({ detail }) => (
    <Box className="problem-header" textAlign="center" mb={8}>
        <Heading as="h1" size="2xl" mb={4}>
            {detail.problem.title}
        </Heading>
        <Box mb={4}>
            <Text>Created on: {new Date(detail.problem.createTime).toLocaleString()}</Text>
            <Text>Uploader: {detail.problem.createUserName}</Text>
        </Box>
        <Table variant="simple" maxW="400px" mx="auto">
            <Thead>
                <Tr>
                    <Td>Difficulty</Td>
                    <Td>Time Limit</Td>
                    <Td>Memory Limit</Td>
                </Tr>
            </Thead>
            <Tbody>
                <Tr>
                    <Td>{detail.problem.difficulty}</Td>
                    <Td>{detail.timeLimitSeconds} seconds</Td>
                    <Td>{detail.memoryLimitMB} MB</Td>
                </Tr>
            </Tbody>
        </Table>
    </Box>
);

export default ProblemHeader;