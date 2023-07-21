import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useState } from 'react'

export const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [show, setShow] = useState(false);
  function submitHandler(){
  }
  return (
    <VStack>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter your Email'
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='pass' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            placeholder='Enter your Password'
            type={show ? 'text' : 'password'}
            onChange={(e) => setPass(e.target.value)}
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
    </VStack>
  )
}
