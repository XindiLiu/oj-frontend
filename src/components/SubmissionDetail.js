import React from 'react';
import PropTypes from 'prop-types';
import { Box, Code, Heading } from '@chakra-ui/react';

const SubmissionDetail = ({ code, language }) => (
    <Box className="submission-code" mt={4}>
        <Heading size="md" mb={2}>
            Submitted Code
        </Heading>
        <Box
            bg="gray.100"
            p={4}
            borderRadius="md"
            overflow="auto"
            fontFamily="monospace"
            whiteSpace="pre-wrap"
            border="1px solid #ddd"
        >
            <Code>{code}</Code>
        </Box>
    </Box>
);

SubmissionDetail.propTypes = {
    code: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
};

export default SubmissionDetail;