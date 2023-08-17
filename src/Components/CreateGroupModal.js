import { Box, Button, Container, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { ChatState } from './Contexts/ChatProvider';
import { CloseIcon } from '@chakra-ui/icons';
const base = 'https://chatter-backend-90rs.onrender.com';

export const CreateGroupModal = ({ children }) => {
    const { user, chats, setChats, col1, col2, col3, col4 } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [search, setSearch] = useState();
    const [name, setName] = useState();
    const [searchResults, setSearchResults] = useState();
    const [selChat, setSelChat] = useState([]);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleSearch = async (temp) => {
        setLoading(true);
        setSearch(temp);
        if (!search) {
            setSearchResults();
            setLoading(false);
            return;
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get(`${base}/api/user/?search=${temp}`, config);
            setSearchResults(data);
            setLoading(false);
        }
        catch (error) {
            setLoading(false);
            return;
        }
    }

    const selUser = (users) => {
        if (selChat.includes(users)) {
            toast({
                title: "User has already been added",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            return;
        }
        setSelChat([users, ...selChat]);
    }

    const delUser = (users) => {
        setSelChat(selChat.filter(temp => temp._id !== users._id));
    }

    const createGroup = async () => {
        if (!name || !selChat) {
            toast({
                title: "Please fill all the fields.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        }
        if (selChat.length < 2) {
            toast({
                title: "Please add at least two users, excluding yourself.",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
        }
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.post(`${base}/api/chat/group`, { users: JSON.stringify(selChat.map(t => t._id)), name }, config);
            setChats([data, ...chats]);
        }
        catch (error) {
            toast({
                title: "Group was not created",
                status: "error",
                duation: 5000,
                isClosable: true,
                position: "top"
            });
        }
    }

    return <Box>
        <Container onClick={onOpen}
            padding={0}
        >
            {children}
        </Container>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent height='auto' width={'50%'}>
                <ModalHeader
                    fontSize='35px'
                    // fontFamily='Work-sans'
                    display='flex'
                >
                    Create a new Group
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody
                    display='flex'
                    flexDir='column'
                    alignItems='center'
                >
                    <FormControl>
                        <Input
                            placeholder='Chat Name'
                            marginBottom='30px'
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Input
                            placeholder='User Search'
                            onChange={(e) => handleSearch(e.target.value)}
                            px='4'
                            mb={3}
                        />
                    </FormControl>
                    <Box display='flex' width='100%' flexWrap='wrap'>
                        {selChat?.map(temp => {
                            return <Box px={2}
                                py={1}
                                borderRadius='lg'
                                m={1}
                                mb={2}
                                fontSize={14}
                                bgColor='purple'
                                color='white'
                                display='flex'
                                alignItems='center'
                                key={temp._id}
                            >
                                <Text>
                                    {temp.name}
                                </Text>
                                <CloseIcon ml='5px' cursor='pointer' onClick={() => delUser(temp)} />
                            </Box>
                        })}
                    </Box>
                    <Box width={loading ? 'auto' : '100%'}>
                        {
                            !loading ? searchResults?.slice(0, Math.min(4, searchResults.length)).map(users => {
                                return <Box cursor='pointer'
                                    px={3}
                                    py={2}
                                    borderRadius='lg'
                                    key={users._id}
                                    onClick={() => selUser(users)}
                                    _hover={{ bgColor: selChat.find(temp => temp === users._id) ? 'grey' : 'lightgrey' }}
                                >
                                    <Text display='inline' fontSize='1.3rem'>
                                        {users.name}
                                    </Text>{' '}
                                    <Text display='inline' fontSize='0.8rem'>
                                        {users.email}
                                    </Text>
                                </Box>
                            }) : <Spinner thickness='4px'
                                speed='0.65s'
                                emptyColor='white'
                                color='gray'
                                size='lg' />
                        }
                    </Box>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => {
                        createGroup();
                        toast({
                            title: "New group successfully created!",
                            status: "success",
                            duration: 5000,
                            isClosable: true,
                            position: "top"
                        });
                        onClose();
                    }}>
                        Create
                    </Button>
                    <Button colorScheme='gray' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </Box >
}