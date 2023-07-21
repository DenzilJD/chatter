import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const [pic, setPic] = useState('');
    const [show, setShow] = useState(false);
    function submitHandler(){
    }
    return (
        <VStack spacing={'5px'}>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    placeholder='Enter your Name'
                    onChange={(e) => setName(e.target.value)}
                />
            </FormControl>
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
                        type={show?'text':'password'}
                        onChange={(e) => setPass(e.target.value)}
                        />
                    <InputRightElement width={'4.5rem'}
                    >
                        <Button h={'1.75rem'} size={'sm'} onClick={()=>setShow(!show)}>
                            {show ? <ViewIcon /> : <ViewOffIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl id='cpass' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        placeholder='Confirm your Password'
                        type={show?'text':'password'}
                        onChange={(e) => setCpass(e.target.value)}
                        />
                    <InputRightElement width={'4.5rem'}
                        onChange={(e) => setCpass(e.target.value)}
                        >
                        <Button h={'1.75rem'} size={'sm'} onClick={()=>setShow(!show)}>
                            {show ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                </InputRightElement>
                </InputGroup>
            </FormControl>
            <FormControl>
                <FormLabel>Profile Picture</FormLabel>
                <Input
                    type='file'
                    p={1.5}
                    accept='image*'
                    onChange={(e) => setPic(e.target.value)}
                />
            </FormControl>
            <Button
                colorScheme='blue'
                width={'100%'}
                style={{marginTop: 15}}
                onClick={submitHandler}
            >
                Create Account
            </Button>
        </VStack>
    )
}
