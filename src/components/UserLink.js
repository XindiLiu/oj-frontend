// src/components/UserdisplayName.js
import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Text, Link } from '@chakra-ui/react';
import { AuthContext } from '../contexts/AuthContext';

function UserLink({ user }) {

    if (!user) {
        return null;
    }

    return (
        <Link as={RouterLink} to={`/user/${user.id}`} color="teal.500">
            <Text>{user.displayName}</Text>
        </Link>
    );
}

export default UserLink;