import React from 'react';
import { Box, Heading, VStack, HStack, Text } from '@chakra-ui/react';
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
                <VStack align="start" spacing={2}>

                    {detail.sampleIo.map((submission, index) => (
                        <HStack key={submission.name} >
                            <VStack align="start" spacing={2} flex="1">
                                <Heading as="h2" size="sm" mb={2}> Sample Input {index + 1}</Heading>
                                <Box as="pre" p={4} bg="gray.100" borderRadius="md" minW="300px" fontFamily="monospace" minH="100px">
                                    {submission.in}
                                </Box>
                            </VStack>
                            <VStack align="start" spacing={2} flex="1">
                                <Heading as="h2" size="sm" mb={2}> Sample Output {index + 1}</Heading>
                                <Box as="pre" p={4} bg="gray.100" borderRadius="md" minW="300px" fontFamily="monospace" minH="100px">
                                    {submission.out}
                                </Box>
                            </VStack>
                        </HStack>
                    ))}
                </VStack>



            </Box>
        </VStack>
    </Box>
);

export default ProblemBody;