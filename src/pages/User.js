import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import {
    Box,
    Heading,
    Text,
    List,
    ListItem,
    Spinner,
    Alert,
    AlertIcon,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react';
import { api } from '../services/api';
import SubmissionList from '../components/SubmissionList';
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';

const UserPage = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);

    const isOwnProfile = user && user.id.toString() === id;

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await api.get(`/user/${id}`);
                setUserInfo(response.data.data);
            } catch (err) {
                setError('Failed to fetch user information.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchUserInfo();
        }
    }, [id]);

    const handleTabsChange = (index) => {
        setTabIndex(index);
        localStorage.setItem('userPageTabIndex', index);
    };

    if (loading) return <Box textAlign="center" mt={10}><Spinner size="xl" /></Box>;
    if (error) return <Alert status="error" mt={10}><AlertIcon />{error}</Alert>;

    return (
        <Box mx="auto" mt={10} p={6} borderWidth="1px" borderRadius="lg" boxShadow="lg">
            <Heading as="h2" size="lg" mb={4}>
                {userInfo.name}
            </Heading>
            <List spacing={3}>
                <ListItem>
                    <Text><strong>ID:</strong> {userInfo.id}</Text>
                </ListItem>
                <ListItem>
                    <Text><strong>Score:</strong> {userInfo.score}</Text>
                </ListItem>
                <ListItem>
                    <Text><strong>Created:</strong> {new Date(userInfo.createTime).toLocaleString()}</Text>
                </ListItem>
            </List>

            {/* Selection Tabs with conditional rendering */}
            <Tabs index={tabIndex} onChange={handleTabsChange} isFitted variant="enclosed" mt={6}>
                <TabList mb="1em">
                    <Tab>Submissions</Tab>
                    <Tab>Solved Problems</Tab>
                    {isOwnProfile && <Tab>Edit Profile</Tab>}
                    {isOwnProfile && <Tab>Change Password</Tab>}
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <SubmissionList id={id} />
                    </TabPanel>
                    <TabPanel>
                        <Text>Here are the problems you have solved.</Text>
                        {/* Add your Solved Problems component or content here */}
                    </TabPanel>
                    {isOwnProfile && (
                        <TabPanel>
                            <EditProfile />
                        </TabPanel>
                    )}
                    {isOwnProfile && (
                        <TabPanel>
                            <ChangePassword />
                        </TabPanel>
                    )}
                </TabPanels>
            </Tabs>
        </Box>
    );
}

export default UserPage;