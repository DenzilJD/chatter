import { Box, Container, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Login } from './Authentication/Login';
import { Signup } from './Authentication/Signup';

export const Homepage = () => {
    return <Container maxW={'xl'}
        centerContent
    >
        <Box dir='flex'>
            <Text>
                Chatter
            </Text>
        </Box>
        <Box width={'100%'} bgColor={'whitesmoke'}>
            <Tabs variant='soft-rounded'>
                <TabList mb={'1em'}>
                    <Tab width={'50%'}>Login</Tab>
                    <Tab width={'50%'}>Sign Up</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>{<Login />}</TabPanel>
                    <TabPanel>{<Signup />}</TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    </Container>
}