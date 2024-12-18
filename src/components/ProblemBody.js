import React from 'react';
import {
    Box,
    Heading,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    HStack
} from '@chakra-ui/react';
import MarkdownText from './MarkdownText';

const ProblemBody = ({ detail }) => (
    <Box className="problem-body" flex="1" ml={8}>
        <VStack align="start" spacing={6}>
            <Box>
                <Heading as="h2" size="md" mb={2}>
                    Description
                </Heading>
                <MarkdownText>{detail.description}</MarkdownText>
            </Box>
            <Box>
                <Heading as="h2" size="md" mb={2}>
                    Input Format
                </Heading>
                <MarkdownText>{detail.inputFormat}</MarkdownText>
            </Box>
            <Box>
                <Heading as="h2" size="md" mb={2}>
                    Output Format
                </Heading>
                <MarkdownText>{detail.outputFormat}</MarkdownText>
            </Box>
            <Box>
                <Heading as="h2" size="md" mb={2}>
                    Sample Data
                </Heading>
                <Table variant="unstyled">
                    <Tbody>
                        {detail.sampleIo.map((submission, index) => (
                            <React.Fragment key={index}>
                                <Tr>
                                    <Td verticalAlign="top" pl={0} pr={4} pb={1} pt={0}>
                                        <Heading as="h2" size="sm" mb={1}> Sample Input {index + 1}</Heading>
                                    </Td>
                                    <Td verticalAlign="top" pl={0} pr={4} pb={1} pt={0}>
                                        <Heading as="h2" size="sm" mb={1}> Sample Output {index + 1}</Heading>
                                    </Td>
                                </Tr>
                                <Tr>
                                    <Td verticalAlign="top" pl={0} pr={4} pb={4} pt={0}>
                                        <Box as="pre" p={4} bg="gray.100" borderRadius="md" minW="300px" fontFamily="monospace" height="100%">
                                            {submission.in}
                                        </Box>
                                    </Td>
                                    <Td verticalAlign="top" pl={0} pr={4} pb={4} pt={0}>
                                        <Box as="pre" p={4} bg="gray.100" borderRadius="md" minW="300px" fontFamily="monospace" height="100%">
                                            {submission.out}
                                        </Box>
                                    </Td>
                                </Tr>
                            </React.Fragment>
                        ))}
                    </Tbody>
                </Table>
                {/* <VStack align="start" spacing={2}>

                    {detail.sampleIo.map((submission, index) => (
                        // Adjust the alignment of the HStack
                        <HStack key={submission.name} alignItems="start">
                            <VStack align="start" spacing={2} flex="1">
                                <Heading as="h2" size="sm" mb={2}> Sample Input {index + 1}</Heading>
                                <Box as="pre" p={4} bg="gray.100" borderRadius="md" minW="300px" fontFamily="monospace" minH="100px" height="100%">
                                    {submission.in}
                                </Box>
                            </VStack>
                            <VStack align="start" spacing={2} flex="1">
                                <Heading as="h2" size="sm" mb={2}> Sample Output {index + 1}</Heading>
                                <Box as="pre" p={4} bg="gray.100" borderRadius="md" minW="300px" fontFamily="monospace" minH="100px" height="100%">
                                    {submission.out}
                                </Box>
                            </VStack>
                        </HStack>
                    ))}
                </VStack> */}
            </Box>
        </VStack>
    </Box>
);

export default ProblemBody;