import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from '../Contexts/ChatProvider';
import { ProfileModal } from './ProfileModal';
import { useNavigate } from 'react-router-dom';

export const ChatHeader = () => {
    const navigate = useNavigate();
    const { user, setUser, selChat, setSelChat, notif, setNotif, col1, col2, col3, col4 } = ChatState();

    useEffect(() => {
        setNotif(notif.filter(temp => temp._id !== selChat._id));
    }, [selChat]);

    return <Box
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        p='5px 10px 5px 10px'
        borderWidth='5px'
        borderColor={col1}
    >
        <Text fontSize='2xl' color={col4}>
            Chatter
        </Text>
        <Box>
            <Menu>
                <MenuButton p={1}>
                    <BellIcon fontSize='2xl' margin={1} color={notif && notif.length > 0 ? 'red' : col2} />
                </MenuButton>
                <MenuList color='black'>
                    {notif && notif.length > 0 ? notif.map(temp => {
                        return <MenuItem key={temp._id} onClick={() => {
                            setNotif(notif.filter(t => t._id !== temp._id));
                            setSelChat(temp.chat);
                        }}>
                            <Box>
                                <b>{temp.chat.isGroup ? temp.chat.chatName
                                    : temp.chat.users.find(temp => temp._id !== user._id).name}</b><br />
                                {temp.sender.name}<br />
                                {temp.content}
                            </Box>
                        </MenuItem>
                    }) : <Text p='5px'>No new messages</Text>
                    }
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} bgColor={col2} rightIcon={<ChevronDownIcon color={col1} />}>
                    <Avatar size='sm' cursor='pointer' name={user.name} />
                </MenuButton>
                <MenuList>
                    <MenuItem>
                        <ProfileModal user={user} />
                    </MenuItem>
                    <MenuItem color='red'
                        fontWeight={500}
                        onClick={() => {
                            localStorage.removeItem("userInfo");
                            setUser();
                            navigate('/');
                        }}>
                        Log Out
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    </Box>
}
