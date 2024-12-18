import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Heading,
    VStack,
    Textarea,
    Alert,
    AlertIcon,
    HStack,
    IconButton,
    Text, useToast
} from '@chakra-ui/react';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';

function ProblemForm({ mode, problemId }) {
    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const [visibility, setVisibility] = useState('PUBLIC');
    const [description, setDescription] = useState('');
    const [inputFormat, setInputFormat] = useState('');
    const [outputFormat, setOutputFormat] = useState('');
    const [sampleIo, setSampleIo] = useState([{ input: '', output: '' }]);
    const [timeLimitSeconds, setTimeLimitSeconds] = useState('');
    const [memoryLimitMB, setMemoryLimitMB] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const toast = useToast();
    useEffect(() => {
        if (mode === 'edit' && problemId) {
            // Fetch existing problem data
            const fetchProblem = async () => {
                try {
                    const response = await api.get(`/problem/detail/${problemId}`);
                    const data = response.data.data;
                    setTitle(data.problem.title);
                    setDifficulty(data.problem.difficulty.toString());
                    setVisibility(data.problem.visibility);
                    setDescription(data.description);
                    setInputFormat(data.inputFormat);
                    setOutputFormat(data.outputFormat);
                    // Map the fetched sampleIo to match the frontend state structure
                    const formattedSampleIo = (data.sampleIo || []).map(pair => ({
                        input: pair.in || '',
                        output: pair.out || ''
                    }));
                    setSampleIo(formattedSampleIo.length > 0 ? formattedSampleIo : [{ input: '', output: '' }]);
                    setTimeLimitSeconds(data.timeLimitSeconds.toString());
                    setMemoryLimitMB(data.memoryLimitMB.toString());
                } catch (err) {
                    console.error('Error fetching problem data:', err);
                    setError('Failed to load problem data.');
                }
            };
            fetchProblem();
        }
    }, [mode, problemId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate numerical fields
        const difficultyInt = parseInt(difficulty, 10);
        const timeLimit = parseInt(timeLimitSeconds, 10);
        const memoryLimit = parseInt(memoryLimitMB, 10);

        const payload = {
            title: title,
            difficulty: difficultyInt,
            visibility: visibility,
            description: description,
            inputFormat: inputFormat,
            outputFormat: outputFormat,
            sampleIo: sampleIo.map(pair => ({
                in: pair.input,
                out: pair.output
            })), // Adjust payload to match backend expectations
            timeLimitSeconds: timeLimit,
            memoryLimitMB: memoryLimit,
        };

        try {
            if (mode === 'add') {
                const response = await api.post('/problem/add', payload);
                toast({
                    title: 'Success',
                    description: 'Problem added successfully!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
                navigate(`/problem/update/${response.data.data.problem.id}`);
            } else if (mode === 'edit') {
                const response = await api.post(`/problem/update/${problemId}`, payload);
                toast({
                    title: 'Success',
                    description: 'Problem updated successfully!',
                    status: 'success',
                    duration: 5000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.error(`There was an error during ${mode === 'add' ? 'adding' : 'updating'} the problem!`, error);
            setError(`Failed to ${mode === 'add' ? 'add' : 'update'} problem.`);
        }
    };

    const handleSampleIoChange = (index, field, value) => {
        const newSampleIo = [...sampleIo];
        newSampleIo[index][field] = value;
        setSampleIo(newSampleIo);
    };

    const addSampleIoPair = () => {
        setSampleIo([...sampleIo, { input: '', output: '' }]);
    };

    const removeSampleIoPair = (index) => {
        const newSampleIo = sampleIo.filter((_, i) => i !== index);
        setSampleIo(newSampleIo.length > 0 ? newSampleIo : [{ input: '', output: '' }]);
    };

    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={4}>
            {error && (
                <Alert status="error">
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter problem title"
                />
            </FormControl>
            <FormControl id="difficulty">
                <FormLabel>Difficulty</FormLabel>
                <Input
                    type="number"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    placeholder="Enter difficulty level"
                    min="1"
                    max="10"
                />
            </FormControl>
            <FormControl id="visibility">
                <FormLabel>Visibility</FormLabel>
                <Input
                    type="text"
                    value={visibility}
                    onChange={(e) => setVisibility(e.target.value)}
                    placeholder="Enter visibility (e.g., PUBLIC, PRIVATE)"
                />
            </FormControl>
            <FormControl id="description">
                <FormLabel>Description</FormLabel>
                <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter problem description"
                    height="200px"
                />
            </FormControl>
            <FormControl id="inputFormat">
                <FormLabel>Input Format</FormLabel>
                <Textarea
                    value={inputFormat}
                    onChange={(e) => setInputFormat(e.target.value)}
                    placeholder="Describe the input format"
                    height="100px"
                />
            </FormControl>
            <FormControl id="outputFormat">
                <FormLabel>Output Format</FormLabel>
                <Textarea
                    value={outputFormat}
                    onChange={(e) => setOutputFormat(e.target.value)}
                    placeholder="Describe the output format"
                    height="100px"
                />
            </FormControl>
            <FormControl id="sampleIo">
                <FormLabel>Sample Data</FormLabel>
                <VStack spacing={4} align="stretch">
                    {sampleIo.map((pair, index) => (
                        <Box key={index} borderWidth="1px" borderRadius="md" p={4}>
                            <HStack align="start" spacing={4}>
                                <Text fontWeight="bold" mt={2}>
                                    {index + 1}.
                                </Text>
                                <FormControl id={`input-${index}`} isRequired>
                                    <FormLabel>Input</FormLabel>
                                    <Textarea
                                        value={pair.input}
                                        onChange={(e) => handleSampleIoChange(index, 'input', e.target.value)}
                                        placeholder={`Enter input for sample pair ${index + 1}`}
                                        height="80px"
                                    />
                                </FormControl>
                                <FormControl id={`output-${index}`} isRequired>
                                    <FormLabel>Output</FormLabel>
                                    <Textarea
                                        value={pair.output}
                                        onChange={(e) => handleSampleIoChange(index, 'output', e.target.value)}
                                        placeholder={`Enter output for sample pair ${index + 1}`}
                                        height="80px"
                                    />
                                </FormControl>
                                <IconButton
                                    aria-label="Remove sample data pair"
                                    icon={<DeleteIcon />}
                                    colorScheme="red"
                                    onClick={() => removeSampleIoPair(index)}
                                />
                            </HStack>
                        </Box>
                    ))}
                    <Button
                        leftIcon={<AddIcon />}
                        colorScheme="green"
                        variant="outline"
                        onClick={addSampleIoPair}
                    >
                        Add Sample Data
                    </Button>
                </VStack>
            </FormControl>
            <FormControl id="timeLimitSeconds">
                <FormLabel>Time Limit (seconds)</FormLabel>
                <Input
                    type="number"
                    value={timeLimitSeconds}
                    onChange={(e) => setTimeLimitSeconds(e.target.value)}
                    placeholder="Enter time limit in seconds"
                    min="1"
                />
            </FormControl>
            <FormControl id="memoryLimitMB">
                <FormLabel>Memory Limit (MB)</FormLabel>
                <Input
                    type="number"
                    value={memoryLimitMB}
                    onChange={(e) => setMemoryLimitMB(e.target.value)}
                    placeholder="Enter memory limit in MB"
                    min="1"
                />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
                {mode === 'add' ? 'Create Problem' : 'Update Problem'}
            </Button>
        </VStack>
    );
}

ProblemForm.propTypes = {
    mode: PropTypes.oneOf(['add', 'edit']).isRequired,
    problemId: PropTypes.string, // Required only for edit mode
};

ProblemForm.defaultProps = {
    problemId: null,
};

export default ProblemForm;