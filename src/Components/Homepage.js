import { Box, Container, Text, Tabs, TabList, TabPanels, Tab, TabPanel, Img } from '@chakra-ui/react';
import { Login } from './Authentication/Login';
import { Signup } from './Authentication/Signup';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { ChatState } from '../Contexts/ChatProvider';
import HomePageImg from '../assets/HomePage.svg';

export const Homepage = () => {
    const navigate = useNavigate();
    const { col1, col2, col3, col4 } = ChatState();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        if (user)
            navigate('/chats');
    }, [navigate]);

    return <Box
    display='flex'
    flexDir='column'
    width='100%'
    >
        <Text fontSize='50px'>Chatter</Text>
        <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            flexDir={{ base: 'column', md: 'row' }}
            w='100%'
        >
            <Box display='flex' flexDir='column' alignItems='center'ml={{base:'0',md:'15%'}} mt='-50px'>
                <Img
                    src={HomePageImg}
                    minWidth={{base:'170%',md:'300%'}}
                    // transform={{base: 'scale(1)',md:''}}
                    alt="website logo"
                />
                <Text href="https://www.freepik.com/free-vector/digital-lifestyle-concept-illustration_18493586.htm#from_view=detail_alsolike">Image by storyset on Freepik</Text>
            </Box>
            <Box width={{ base: '80%', md: '30%' }} borderRadius='21px' bgColor='whitesmoke' p='5px' ml={{ base: '0', md: 'auto' }} mr={{base:'0',md:'10%'}}>
                <Tabs variant='soft-rounded' colorScheme='blue'>
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
        </Box>
    </Box>
}