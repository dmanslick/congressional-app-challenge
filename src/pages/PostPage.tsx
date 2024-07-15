import { FormEvent, useState } from 'react'
import { AbsoluteCenter, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../utils/getPost'
import { Link as ChakraLink } from '@chakra-ui/react'
import { ChevronLeft, MessageSquareIcon } from 'lucide-react'
import CommentCard from '../components/CommentCard'
import { createComment } from '../utils/createComment'
import { useUser } from '../firebase/useUser'

type Params = {
    id: string
}

const maxW = { base: '300px', sm: '400px', md: '700px' }

export default function PostPage() {
    const { id } = useParams<Params>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [content, setContent] = useState('')
    const queryClient = useQueryClient()
    const { user } = useUser()

    const post = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id as string),
        refetchInterval: 1000 * 30,
        staleTime: 1000 * 60 * 5,
    })

    const { mutate, error: mutateError } = useMutation({
        mutationFn: createComment,
        onSuccess: ({ username, content }: any) => queryClient.setQueryData(['post', id], { username, content })
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        console.log('shit')
        // @ts-ignore
        mutate({ id, content, username: user?.displayName })
    }

    if (post.error) {
        return (
            <AbsoluteCenter>
                <Text color='red'>Error</Text>
            </AbsoluteCenter>
        )
    }

    return (
        <Box pt='56px'>
            <Box ml={2} my={4}>
                <ChakraLink as={Link} to='/app/community' display='flex' color='blue.500' alignItems='center'>
                    <ChevronLeft height={24} width={24} />Back
                </ChakraLink>
            </Box>
            <Card maxW={maxW} mx='auto'>
                <CardHeader>
                    <Text fontSize='xl' fontWeight='semibold'>{post.data?.title}</Text>
                </CardHeader>
                <CardBody mt={-6}>
                    <Text color='grey'>{post.data?.content}</Text>
                </CardBody>
                <CardFooter ml='auto' color='#bababa' display='flex' flexDir='row' alignItems='center' gap={2}>
                    <MessageSquareIcon /><Text>{post.data?.comments.length}</Text>
                </CardFooter>
            </Card>
            <Center>
                <Button type='submit' colorScheme='blue' w={maxW} mt={4} onClick={onOpen}>Leave a comment</Button>
            </Center>
            {post.data?.comments.map(comment => {
                const commentObj = JSON.parse(comment) as Comment
                return (
                    <CommentCard data={commentObj} />
                )
            })}
            <Modal isOpen={isOpen} onClose={onClose}>
                <Portal>
                    <ModalOverlay />
                    <ModalContent mx='4'>
                        <ModalHeader>Comment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <label htmlFor='comment' className='visually-hidden'>Comment Content</label>
                            <Textarea placeholder='My Comment' id='comment' onChange={e => setContent(e.target.value)} />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>Submit</Button>
                            <Button colorScheme='red' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Portal>
            </Modal>
        </Box >
    )
}