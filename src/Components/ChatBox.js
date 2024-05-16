import { Box, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import { ChatState } from '../Contexts/ChatProvider'
import { ArrowBackIcon, ArrowRightIcon } from '@chakra-ui/icons';
import axios from 'axios';
import io from 'socket.io-client';
const ENDPOINT = 'https://chatter-backend-90rs.onrender.com';
// const ENDPOINT = 'http://localhost:5000';
let socket, selChatCmp;

export const ChatBox = () => {
  const { user, selChat, setSelChat, chats, setChats, notif, setNotif, col1, col2, col3, col4 } = ChatState();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [connected, setConnected] = useState(false);
  const bottomRef = useRef(null);
  const toast = useToast();

  const func = async () => {
    try {
      setLoading(true);
      if (selChat) {
        const config = {
          headers: {
            "Authorization": `Bearer ${user.token}`
          }
        }
        setMessage('');
        const { data } = await axios.get(`${ENDPOINT}/api/message/${selChat._id}`, config);
        if (data)
          setMessages(data);
      }
      setLoading(false);
      socket.emit('join chat', selChat._id);
    }
    catch (error) {
      toast({
        title: "Error!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selChat)
      func();
    selChatCmp = selChat;
  }, [selChat, user.token]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit('setup', user);
    socket.on('connection', () => setConnected(true));
  }, []);

  useEffect(() => {
    socket.on("message recieved", (newMessage) => {
      if (!selChatCmp || selChatCmp._id !== newMessage.chat._id) {
        if (!notif.includes(newMessage)) {
          setNotif([newMessage, ...notif]);
        }
      }
      else
        setMessages([...messages, newMessage]);
    });
  });

  const sendMessage = async () => {
    if (message) {
      try {
        const config = {
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${user.token}`
          }
        }
        setMessage('');
        const { data } = await axios.post(`${ENDPOINT}/api/message`, {
          content: message,
          chatId: selChat._id
        }, config);
        setMessages([...messages, data]);
        socket.emit('new message', data);
        if (data) {
          // console.log(data.chat);
          // setChats([data.chat, ...chats.filter(temp => temp._id !== data.chat._id)]);
        }
      }
      catch (error) {
        toast({
          title: "Error!",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
      }
    }
  }

  return <Box
    display={{ base: selChat ? 'flex' : 'none', md: 'flex' }}
    flexDir='column'
    justifyContent={loading ? 'space-between' : ''}
    w={{ base: '100%', md: '65%' }}
    borderRadius='lg'
    p={3}
    height='85vh'
    ml={{ base: 0, md: '5px' }}
    bgColor='#189AB4'
    color='#D4F1F4'
  >
    <Box
      display='flex'
      flexDir='column'
      justifyContent='center'
      width='100%'
    >
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        marginRight='auto'
        icon={<ArrowBackIcon />}
        onClick={() => setSelChat()}
      />
    </Box>

    {selChat ? <Box
      display='flex'
      flexDir='column'
      mt={!loading ? 'auto' : ''}
      width='100%'
      overflow='scroll'
      color='blackAlpha.700'
      css={{
        '&::-webkit-scrollbar': {
          width: '4px'
        },
        '&::-webkit-scrollbar-track': {
          width: '6px'
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'transparent',
          borderRadius: '24px'
        }
      }}
    >
      {!loading ? (messages ? messages.map(temp => {
        return <Box
          key={temp._id}
          display='flex'
          justifyContent={temp.sender._id === user._id ? 'flex-end' : 'flex-start'}
          width='100%'
        >
          <Box
            bgColor={temp.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'}
            borderRadius='20px'
            padding='5px 15px'
            maxWidth='75%'
            marginTop='2px'
          >
            <Box
              fontSize='0.7rem'
              color={temp.sender._id === user._id ? 'red.500' : 'blue.500'}
            >
              {temp.sender._id === user._id ? 'You' : temp.sender.name}
            </Box>
            {temp.content}
          </Box>
        </Box>
      }) : "Say 'Hi!'") : <Spinner
        size='xl'
        w={20}
        h={20}
        alignSelf='center'
        mb='30vh'
      />}
      <Box ref={bottomRef} />
    </Box> : 'Click/Tap on a chat to view its Messages.'}

    {selChat ? <Box
      display='flex'
      mt={loading ? 'auto' : ''}
      alignItems='center'
      justifyContent='space-between'
      marginBottom='5px'
      width='100%'
      border={`1px solid ${col1}`}
      borderRadius='lg'
    >
      <Input
        placeholder='Message'
        variant='pill'
        px='4'
        bgColor='transparent'
        display='flex'
        value={message}
        _placeholder={{ color: col4 }}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' ? sendMessage() : 0}
      />
      <IconButton
        m='4px'
        bgColor={col2}
        icon={<ArrowRightIcon color={col1} />}
        onClick={sendMessage}
      />
    </Box> : ''}
  </Box>
}