import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const base = 'https://chatter-backend-90rs.onrender.com';
// const base = 'http://localhost:5000';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setLoading(true);
    if (!email || !pass) {
      toast({
        title: "Please fill all the required fields!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      };
      const { data } = await axios.post(`${base}/api/user/login`, {
        email, pass
      }, config);
      toast({
        title: "Login was successful!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top"
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate('/chats');
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
    setLoading(false);
  }
  return (
    <VStack>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter')
              submitHandler();
          }}
        />
      </FormControl>
      <FormControl id='pass' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder='Enter your Password'
            type={show ? 'text' : 'password'}
            onChange={(e) => setPass(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter')
                submitHandler();
            }}
          />
          <InputRightElement width={'4.5rem'}
          >
            <Button h={'1.75rem'} size={'sm'} onClick={() => setShow(!show)}>
              {show ? <ViewIcon /> : <ViewOffIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <Button
        colorScheme='blue'
        width={'100%'}
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Log In
      </Button>
      {loading ? <Spinner
        size='xl'
        w={20}
        h={20}
        alignSelf='center'
        mb='30vh'
      /> : ''}
    </VStack>
  )
}
