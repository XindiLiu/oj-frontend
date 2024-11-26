import React from 'react';
import PropTypes from 'prop-types';
import { Badge, Text, Icon, Link } from '@chakra-ui/react';
import { CheckIcon, CloseIcon, WarningIcon, QuestionIcon } from '@chakra-ui/icons'; // Changed QuestionIcon to WarningIcon
import { Link as RouterLink } from 'react-router-dom';

// Mapping of submission codes to descriptive strings, colors, and icons
const statusMap = {
    AC: { text: 'Accepted', color: 'green', icon: CheckIcon },
    WA: { text: 'Wrong Answer', color: 'red', icon: CloseIcon },
    TLE: { text: 'Time Limit Exceeded', color: 'orange', icon: CloseIcon },
    MLE: { text: 'Memory Limit Exceeded', color: 'orange', icon: CloseIcon },
    RE: { text: 'Runtime Error', color: 'red', icon: CloseIcon },
    CE: { text: 'Compile Error', color: 'yellow', icon: CloseIcon },
    JE: { text: 'Judgement Error', color: 'yellow', icon: WarningIcon }, // Changed icon to WarningIcon
    // Add more statuses as needed
};

const SubmissionResult = ({ statusCode, score, submissionId }) => {
    const status = statusMap[statusCode] || { text: 'Unknown', color: 'gray', icon: QuestionIcon };
    const StatusIcon = status.icon;

    const content = (
        <Text display="flex" alignItems="center">
            <Icon as={StatusIcon} color={`${status.color}.500`} mr={2} />
            <Badge colorScheme={status.color} mr={2}>
                {status.text}
            </Badge>
            {(statusCode !== 'JE' && statusMap[statusCode]) ? `(${score})` : ''}
        </Text>
    );

    return submissionId ? (
        <Link as={RouterLink} to={`/submission/${submissionId}`} >
            {content}
        </Link>
    ) : (
        content
    );
};

SubmissionResult.propTypes = {
    statusCode: PropTypes.string.isRequired,
    score: PropTypes.number,
    submissionId: PropTypes.number,
};

SubmissionResult.defaultProps = {
    score: 0,
    submissionId: null,
};

export default SubmissionResult;