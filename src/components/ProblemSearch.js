import React, { useState } from 'react';
import {
    Box,
    Button,
    Input,
    FormControl,
    FormLabel,
    HStack,
    VStack,
} from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ProblemSearch = ({ onSearch }) => {
    const defaultInputs = {
        title: '',
        minDifficulty: '',
        maxDifficulty: '',
    };
    const [inputs, setInputs] = useState(defaultInputs);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setInputs((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(inputs);
    };

    const handleReset = (e) => {
        e.preventDefault();
        setInputs(defaultInputs);
        onSearch(defaultInputs);
    };

    return (
        <Box mb={4}>
            <HStack spacing={4}>
                <VStack spacing={2} align="stretch">
                    <Button type="submit" colorScheme="blue">
                        Search
                    </Button>
                    <Button onClick={handleReset} colorScheme="red">
                        Reset Filters
                    </Button>
                </VStack>
                <Box as="form" onSubmit={handleSubmit} flex="1">
                    <FormControl id="title">
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            value={inputs.title}
                            onChange={handleChange}
                            placeholder="Search by title"
                        />
                    </FormControl>
                    <HStack spacing={2}>
                        <FormControl id="minDifficulty">
                            <FormLabel>Min Difficulty</FormLabel>
                            <Input
                                type="number"
                                value={inputs.minDifficulty}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                placeholder="1"
                            />
                        </FormControl>
                        <FormControl id="maxDifficulty">
                            <FormLabel>Max Difficulty</FormLabel>
                            <Input
                                type="number"
                                value={inputs.maxDifficulty}
                                onChange={handleChange}
                                min="1"
                                max="10"
                                placeholder="10"
                            />
                        </FormControl>
                    </HStack>

                </Box>
            </HStack>
        </Box>
    );
};

ProblemSearch.propTypes = {
    onSearch: PropTypes.func.isRequired,
};

export default ProblemSearch;