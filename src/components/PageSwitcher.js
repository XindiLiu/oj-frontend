import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
    Button,
    HStack,
    Input,
    IconButton,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const PageSwitcher = ({ currentPage, totalPages, onPageChange }) => {
    const [jumpPage, setJumpPage] = useState(currentPage + 1);

    const getPageNumbers = () => {
        const pages = [];
        const maxButtons = 5;
        let start = Math.max(currentPage - 2, 0);
        let end = Math.min(start + maxButtons, totalPages);

        if (end - start < maxButtons) {
            start = Math.max(end - maxButtons, 0);
        }

        for (let i = start; i < end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const handleJump = () => {
        const page = parseInt(jumpPage, 10) - 1;
        if (!isNaN(page) && page >= 0 && page < totalPages) {
            onPageChange(page);
            setJumpPage(page + 1);
        }
    };
    const handlePageChange = (page) => {
        onPageChange(page);
        setJumpPage(page + 1);
    };
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleJump();
        }
    };
    if (totalPages === 0) return null;

    return (
        <HStack
            spacing={4}
            mt={4}
            justifyContent="center"
            alignItems="center"
            width="100%"
            position="relative"
        >
            <HStack justifyContent="center">
                <IconButton
                    aria-label="Previous Page"
                    icon={<ChevronLeftIcon />}
                    onClick={() => handlePageChange(currentPage - 1)}
                    isDisabled={currentPage === 0}
                    variant="outline"
                    colorScheme="blue"
                />
                {getPageNumbers().map((page) => (
                    <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        colorScheme={page === currentPage ? 'blue' : 'gray'}
                        variant={page === currentPage ? 'solid' : 'outline'}
                    >
                        {page + 1}
                    </Button>
                ))}
                <IconButton
                    aria-label="Next Page"
                    icon={<ChevronRightIcon />}
                    onClick={() => handlePageChange(currentPage + 1)}
                    isDisabled={currentPage >= totalPages - 1}
                    variant="outline"
                    colorScheme="blue"
                />
            </HStack>
            <HStack
                spacing={2}
                justifyContent="flex-end"
                position="absolute"
                right={0}
            >
                <Text>Page:</Text>
                <Input
                    width="60px"
                    type="number"
                    min={1}
                    max={totalPages}
                    value={jumpPage}
                    onChange={(e) => setJumpPage(e.target.value)}
                    onKeyPress={handleKeyPress}

                />
                <Text> / {totalPages}</Text>
                <Button onClick={handleJump} colorScheme="blue" size="sm">
                    Go
                </Button>
            </HStack>
        </HStack>
    );
};

PageSwitcher.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
};

export default PageSwitcher;