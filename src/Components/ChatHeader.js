import { Avatar, Box, Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import React from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
import { ChatState } from './Contexts/ChatProvider';
import { ProfileModal } from './ProfileModal';
import { useNavigate } from 'react-router-dom';

export const ChatHeader = () => {
    const navigate = useNavigate();
    const { user, setUser, col1, col2, col3, col4 } = ChatState();
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
                    <BellIcon fontSize='2xl' margin={1} color={col2} />
                </MenuButton>
                {/* <MenuList></MenuList> */}
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
