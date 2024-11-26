import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import ProblemForm from '../components/ProblemForm';
import AddTestCases from '../components/AddTestCases';
import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel, Button } from '@chakra-ui/react';

function EditProblem() {
    const { problemId } = useParams();

    return (
        <Box maxW="1000px" mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <Heading as="h2" size="lg" mb={6} textAlign="center">
                Edit Problem
            </Heading>
            <Button
                as={RouterLink}
                to={`/problem/${problemId}`}
                colorScheme="blue"
                mb={4}
                alignSelf="flex-start"
            >
                Back to Problem
            </Button>
            <Tabs variant="enclosed" colorScheme="blue">
                <TabList>
                    <Tab>Problem Description</Tab>
                    <Tab>Testcases</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <ProblemForm mode="edit" problemId={problemId} />
                    </TabPanel>
                    <TabPanel>
                        <AddTestCases problemId={problemId} />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default EditProblem;