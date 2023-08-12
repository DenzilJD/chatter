import { AddIcon } from '@chakra-ui/icons';
import { Box, Button, Input, Stack, Tooltip, useToast } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ChatState } from './Contexts/ChatProvider';
import { ChatLoading } from './ChatLoading';
import { Chats } from './Chats';
import { CreateGroupModal } from './CreateGroupModal';

export const MyChats = () => {
  const { user, selChat, setSelChat, chats, setChats } = ChatState();
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState();
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const func = async () => {
      setLoading(true);
      try {
        const config = {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        };
        const { data } = await axios.get('/api/chat/', config);
        setChats(data);
        setLoading(false);
      }
      catch (error) {
        toast({
          title: "Error!",
          description: error.message + '. Try refreshing the page.',
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
        setLoading(false);
      }
    }
    func();
  }, [user.token]);

  const genChats = async (resType, t_id) => {
    setSelChat(t_id);
    if (resType === 'results') {
      setLoading(true);
      if (chats && chats.find(temp => {
        return temp._id === t_id;
      }))
        return;
      const config = {
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${user.token}`
        }
      };
      const { data } = await axios.post('/api/chat/', { userId: t_id }, config);
      setChats([data, ...chats.filter(temp => temp._id !== data._id)]);
      setSelChat(data._id);
      setSearchResults();
      setLoading(false);
    }
  }

  const handleSearch = async (val) => {
    setSearch(val);
    if (search.length > 0) {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        };
        const { data } = await axios.get(`/api/user/?search=${search}`, config);
        setSearchResults(data);
        setLoading(false);
      }
      catch (error) {
        toast({
          title: "Error!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "top"
        });
      }
    }
  }

  return <Box
    display={{ base: selChat ? 'none' : 'flex', md: 'flex' }}
    flexDir='column'
    alignItems='center'
    width={{ base: '100%', md: '35%' }}
    borderRadius='lg'
    p={3}
    height='85vh'
    border='1px solid black'
    bgColor='white'
  >
    <Box
      display='flex'
      alignItems='center'
      justifyContent='space-between'
      marginBottom='5px'
      width='100%'
    >
      <Input
        placeholder='Search User'
        onChange={(e) => handleSearch(e.target.value)}
        variant='pill'
        px='4'
        border='1px solid black'
        bgColor='transparent'
        display='flex'
        maxW='80%'
      />
      <CreateGroupModal>
        <Tooltip
          label='Create a new Group'
        >
          <Button
            bgColor='white'
            fontSize={{ base: '17px', md: '10px', lg: '17px' }}
          >
            <AddIcon />
          </Button>
        </Tooltip>
      </CreateGroupModal>
    </Box>
    <Box display='flex'
      borderRadius='lg'
      width='100%'
      height='100%'
      overflowY='hidden'
    >
      {loading ? <ChatLoading /> : <Stack
        width='100%'
        overflowY='scroll'
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
        _hover={{
          '&::-webkit-scrollbar-thumb': {
            background: 'gray',
            borderRadius: '24px'
          }
        }}
      >
        {searchResults ? searchResults.map(temp => {
          return <Chats key={temp._id} users={temp} genChats={genChats} resType="results">
          </Chats>
        }) : chats ? chats.map(temp => {
          return <Chats key={temp._id} users={temp} genChats={genChats} resType="chats">
          </Chats>
        }) : ''}
      </Stack>
      }
    </Box>
  </Box>
}