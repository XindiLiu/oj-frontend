import React from 'react';
import { Box, Table, Tbody, Tr, Td, TableContainer, Heading } from '@chakra-ui/react';

const ProblemSidebar = ({ detail }) => (
    <Box className="problem-sidebar" borderWidth="1px" borderRadius="lg" p={4} bg="gray.50">
        <Heading as="h3" size="md" mb={4}>
            Problem Details
        </Heading>
        <TableContainer>
            <Table variant="simple">
                <Tbody>
                    <Tr>
                        <Td><strong>Difficulty:</strong></Td>
                        <Td>{detail.problem.difficulty}</Td>
                    </Tr>
                    <Tr>
                        <Td><strong>Time Limit:</strong></Td>
                        <Td>{detail.timeLimitSeconds} seconds</Td>
                    </Tr>
                    <Tr>
                        <Td><strong>Memory Limit:</strong></Td>
                        <Td>{detail.memoryLimitMB} MB</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    </Box>
);

export default ProblemSidebar;