import { Button, Container, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export const ProfileModal = ({ user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return <div>
        <Container onClick={onOpen}
            padding={0}
        >
            My Profile
        </Container>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent height={'50%'} width={'50%'}>
                <ModalHeader>Profile</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    Name: {user.name}
                    <br/>
                    Email: {user.email}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blackAlpha' mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    </div>
}