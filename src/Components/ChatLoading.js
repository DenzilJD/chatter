import { Skeleton, Stack } from '@chakra-ui/react';
import React from 'react';

export const ChatLoading = () => {
  return <Stack width='100%'>
    <Skeleton h='45px'/>
    <Skeleton h='45px'/>
    <Skeleton h='45px'/>
    <Skeleton h='45px'/>
    <Skeleton h='45px'/>
    <Skeleton h='45px'/>
    <Skeleton h='45px'/>
    <Skeleton h='45px'/>
    <Skeleton h='45px'/>
  </Stack>
}