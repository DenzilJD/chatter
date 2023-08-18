import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from './Contexts/ChatProvider';

export const Chats = ({ users, resType, genChats }) => {
    const { user, selChat, col1, col2, col3, col4 } = ChatState();
    const func = () => {
        if (resType === 'chats') {
            let temp;
            if (!users.isGroup) {
                if (users.users) {
                    temp = users.users.find(temp => {
                        if (user._id !== temp._id)
                            return temp;
                    });
                    return <Box>
                        <Text fontSize='25px'>
                            {temp ? temp.name : ''}
                        </Text>
                        <Text>
                            {users.latestMessage ? <><b>{users.latestMessage.sender.name}</b>{': ' + users.latestMessage.content}</> : ''}
                        </Text>
                    </Box>
                }
            }
            else
                return <Box overflowWrap='break-word'>
                    <Text fontSize='25px'>
                        {users.chatName}
                    </Text>
                    <Text>
                        {users.latestMessage ? users.latestMessage.sender.name + ': ' + users.latestMessage.content : ''}
                    </Text>
                </Box>
        }
        else
            return <Box>
                <Text fontSize='25px'>{users.name}</Text>
                <Text>{users.email}</Text>
            </Box>
    }

    return <Box
        cursor='pointer'
        px={3}
        py={2}
        borderRadius='lg'
        h={{ base: '5rem' }}
        key={users._id}
        bgColor={selChat && selChat._id === users._id ? '#D14905' : col1}
        color={selChat && selChat._id === users._id ? col4 : col4}
        _hover={{
            bgColor: selChat && selChat._id === users._id ? '#D14905' : '#F09440'
        }}
        onClick={() => {
            if (resType === 'results')
                genChats(resType, users._id);
            else
                genChats(resType, users);
        }}
    >
        {func()}
    </Box>
}