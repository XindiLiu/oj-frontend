import React, { useState, useEffect, useContext } from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Alert,
    AlertIcon,
    useToast
} from '@chakra-ui/react';
import { AuthContext } from '../contexts/AuthContext';
import { api } from '../services/api';

function EditProfile() {
    const { user, setUser } = useContext(AuthContext);
    const [newName, setNewName] = useState(user.displayName || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const toast = useToast();

    // Effect to display success toast if flag is set in localStorage
    useEffect(() => {
        const isProfileUpdated = localStorage.getItem('profileUpdated');
        if (isProfileUpdated) {
            toast({
                title: 'Profile updated.',
                description: "Your profile has been successfully updated.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            localStorage.removeItem('profileUpdated');
        }
    }, [toast]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const response = await api.post('/userUpdate', {
                id: user.id,
                displayName: newName,
            });

            if (response.data.success) {
                // Set success flag in localStorage
                localStorage.setItem('profileUpdated', 'true');
                // Update user context with new data
                // Reload the page
                window.location.reload();
            } else {
                setError(response.data.message || 'Failed to update profile.');
            }
        } catch (err) {
            console.error(err);
            setError('An error occurred while updating your profile.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box>
            {error && (
                <Alert status="error" mb={4}>
                    <AlertIcon />
                    {error}
                </Alert>
            )}
            <form onSubmit={handleSubmit}>
                <FormControl id="newName" isRequired mb={4}>
                    <FormLabel>New Display Name</FormLabel>
                    <Input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                </FormControl>

                <Button
                    colorScheme="blue"
                    isLoading={loading}
                    type="submit"
                >
                    Save Changes
                </Button>
            </form>
        </Box>
    );
}

export default EditProfile;