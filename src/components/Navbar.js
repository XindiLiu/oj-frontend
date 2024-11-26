// src/components/Navbar.js
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Flex,
  HStack,
  Link,
  Button,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { AuthContext } from '../contexts/AuthContext';
import { useContext } from 'react';

function Navbar() {
  const { isLoggedIn, user } = useContext(AuthContext);
  return (
    <Box bg="blue.900" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Link as={RouterLink} to="/" color="white" fontWeight="bold">
            Home
          </Link>
          <Link as={RouterLink} to="/problems" color="white">
            Problems
          </Link>
          <Link as={RouterLink} to="/problem/add" color="white">
            Add Problem
          </Link>
          <Link as={RouterLink} to="/rank-list" color="white">
            Rank List
          </Link>
        </HStack>
        <Flex alignItems="center">
          {!isLoggedIn ? (
            <Button as={RouterLink} to="/login" variant="ghost" color="white">
              Login
            </Button>
          ) : (
            <HStack spacing={4}>
              {user && (
                <Link as={RouterLink} to={`/user/${user.id}`} color="white">
                  Logged in as {user.name}
                </Link>
              )}
              <Button as={RouterLink} to="/logout" variant="ghost" color="white">
                Logout
              </Button>
            </HStack>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Navbar;