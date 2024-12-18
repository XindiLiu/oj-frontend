import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text, Link, Box
} from '@chakra-ui/react';
import SubmissionResult from './SubmissionResult';
function ProblemList({ problems }) {
    return (
        <Box mt={4}>
            {problems.length === 0 ? (
                <Text>No matching items</Text>
            ) : (
                <TableContainer>
                    <Table variant="simple">
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>Title</Th>
                                <Th isNumeric>Difficulty</Th>
                                <Th isNumeric>User Status</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {problems.map((problem) => (
                                <Tr key={problem.id}>
                                    <Td>
                                        <Link as={RouterLink} to={`/problem/${problem.id}`}>
                                            {problem.id}
                                        </Link>
                                    </Td>
                                    <Td>
                                        <Link as={RouterLink} to={`/problem/${problem.id}`}>
                                            {problem.title}
                                        </Link>
                                    </Td>
                                    <Td isNumeric>{problem.difficulty}</Td>
                                    <Td isNumeric>
                                        {problem.userResult ? (
                                            <SubmissionResult
                                                statusCode={problem.userResult}
                                                score={problem.highestScore}
                                            />
                                        ) : (
                                            <Text>-</Text>
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

export default ProblemList;