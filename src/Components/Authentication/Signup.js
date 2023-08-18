import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const base = 'https://chatter-backend-90rs.onrender.com';
// const base = 'http://localhost:5000';

export const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [cpass, setCpass] = useState('');
    const [pic, setPic] = useState('');
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();

    const submitHandler = async () => {
        setLoading(true);
        if (pass !== cpass) {
            toast({
                title: "Password and confirm password don't match!",
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
            const { data } = await axios.post(`${base}/api/user/signup`, {
                name, email, pass, pic
            }, config);
            console.log(data);
            toast({
                title: "Registration is successful!",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "top"
            });
            localStorage.setItem("userInfo", JSON.stringify(data));
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
            <FormControl id='cpass' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input
                        placeholder='Confirm your Password'
                        type={show ? 'text' : 'password'}
                        onChange={(e) => setCpass(e.target.value)}
                    />
                    <InputRightElement width={'4.5rem'}
                        onChange={(e) => setCpass(e.target.value)}
                    >
                        <Button h={'1.75rem'} size={'sm'} onClick={() => setShow(!show)}>
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
                style={{ marginTop: 15 }}
                onClick={submitHandler}
            >
                Create Account
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
