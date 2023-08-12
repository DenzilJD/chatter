import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from './Contexts/ChatProvider';

export const Chats = ({ users, resType, genChats }) => {
    const { user, selChat } = ChatState();
    const func = () => {
        if (resType === 'chats') {
            let temp;
            if (!users.isGroup) {
                temp = users.users.find(temp => {
                    if (user._id !== temp._id)
                        return temp;
                });
                return <Box>
                    <Text fontSize='25px'>
                        {temp.name}
                    </Text>
                    <Text>
                        {users.latestMessage ? users.latestMessage.sender.name + ': ' + users.latestMessage.content : ''}
                    </Text>
                </Box>
            }
            else
                return <Box>
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
        key={users._id}
        bgColor={selChat && selChat._id === users._id ? 'grey' : 'white'}
        color={selChat && selChat._id === users._id ? 'white' : 'black'}
        _hover={{ bgColor: selChat && selChat._id === users._id ? 'grey' : 'lightgrey' }}
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