import React from 'react'
import { ChatState } from './Contexts/ChatProvider';
import { ChatHeader } from './ChatHeader';
import { Box } from '@chakra-ui/react';
import { MyChats } from './MyChats';
import { ChatBox } from './ChatBox';

export const Chatpage = () => {
    const { user } = ChatState();
    return <div style={{ width: '100%' }}>
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
    </div>
}