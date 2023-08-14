import { Box, Container, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Login } from './Authentication/Login';
import { Signup } from './Authentication/Signup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Homepage = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user)
            navigate('/chats');
    }, [navigate]);
    
    return <Container w='100%'
        centerContent
        display='flex'
        justifyContent='center'
        bgColor='orange.200'
    >
        <Box display='flex'>
            <Text>
                Chatter
            </Text>
        </Box>
        <Box width='100%' height='80%' borderRadius='21px' bgColor='whitesmoke' p='5px'>
            <Tabs variant='soft-rounded' colorScheme='orange'>
                <TabList mb='1em'>
                    <Tab width='50%'>Login</Tab>
                    <Tab width='50%'>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel><Login /></TabPanel>
                    <TabPanel><Signup /></TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>
}