import React, { useState, useContext } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    VStack,
    Alert,
    AlertIcon,
    Heading,
} from '@chakra-ui/react';
import { api } from '../services/api';
import { AuthContext } from '../contexts/AuthContext';

function ChangePassword() {
    const { user, logout } = useContext(AuthContext);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleChangePassword = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        if (newPassword === oldPassword) {
            setError('New password cannot be the same as the old password.');
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }

        try {
            const response = await api.post('/userUpdatePassword', {
                id: user.id,
                oldPassword: oldPassword,
                newPassword: newPassword,
            });
            setSuccess('Password updated successfully. You will be logged out.');
            setTimeout(() => {
                logout();
            }, 3000);
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError('Failed to update password.');
            }
            console.error('Change password error:', err);
        }
    };

    return (
        <Box maxW="400px" mx="auto" mt={4}>
            <Heading size="md" mb={4}>
                Change Password
            </Heading>
            <VStack as="form" onSubmit={handleChangePassword} spacing={4}>
                {success && (
                    <Alert status="success">
                        <AlertIcon />
                        {success}
                    </Alert>
                )}
                {error && (
                    <Alert status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
                <FormControl id="oldPassword" isRequired>
                    <FormLabel>Old Password</FormLabel>
                    <Input
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        placeholder="Enter your current password"
                    />
                </FormControl>
                <FormControl id="newPassword" isRequired>
                    <FormLabel>New Password</FormLabel>
                    <Input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                    />
                </FormControl>
                <FormControl id="confirmNewPassword" isRequired>
                    <FormLabel>Confirm New Password</FormLabel>
                    <Input
                        type="password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        placeholder="Confirm your new password"
                    />
                </FormControl>
                <Button type="submit" colorScheme="blue" width="full">
                    Change Password
                </Button>
            </VStack>
        </Box>
    );
}

export default ChangePassword;