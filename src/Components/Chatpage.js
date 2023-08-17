import React from 'react'
import { ChatState } from './Contexts/ChatProvider';
import { ChatHeader } from './ChatHeader';
import { Box } from '@chakra-ui/react';
import { MyChats } from './MyChats';
import { ChatBox } from './ChatBox';

export const Chatpage = () => {
    const { user } = ChatState();
    const { col1, col2, col3, col4 } = ChatState();
    return <Box w='100%' bgColor='#05445E'>
        {user && <ChatHeader />}
        <Box
        display='flex'
        justifyContent='space-between'
        w='100%'
        p='10px'
        >
            {user && <MyChats />}
            {user && <ChatBox />}
        </Box>
    </Box>
}