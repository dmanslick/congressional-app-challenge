import { FormEvent, useState } from 'react'
import { AbsoluteCenter, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, Spinner, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { getPost } from '../utils/getPost'
import { Link as ChakraLink } from '@chakra-ui/react'
import { ChevronLeft, MessageSquareIcon } from 'lucide-react'
import CommentCard from '../components/CommentCard'
import { createComment } from '../utils/createComment'
import { useUser } from '../firebase/useUser'
import { cardMaxW } from '../utils/constants'

type Params = {
    id: string
}

export default function PostPage() {
    const { id } = useParams<Params>()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [content, setContent] = useState('')
    const queryClient = useQueryClient()
    const { user } = useUser()
    const isSubmitDisabled = content == ''

    const post = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id as string),
        // refetchInterval: 1000 * 30,
        refetchOnMount: 'always',
        staleTime: 1000 * 60,
    })

    const { mutate, error: mutateError } = useMutation({
        mutationFn: createComment,
        onSuccess: (_, { username, content }: any) => queryClient.setQueryData(['post', id], (prev: Post) => {
            const newComments = [...prev.comments, JSON.stringify({ username, content })]
            return { ...prev, comments: newComments }
        }),
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        // @ts-ignore
        if (content != '') mutate({ id, content, username: user?.displayName })
        onClose()
    }

    if (post.error || mutateError) {
        return (
            <AbsoluteCenter>
                <Text color='red'>Error</Text>
            </AbsoluteCenter>
        )
    }

    if (post.isLoading) {
        return (
            <AbsoluteCenter>
                <Spinner color='blue.500' />
            </AbsoluteCenter>
        )
    }

    return (
        <Box pt='56px'>
            <Box ml={2} my={4} w='fit-content'>
                <ChakraLink as={Link} to='/app/community' display='flex' color='blue.500' alignItems='center'>
                    <ChevronLeft height={24} width={24} /><span>Back</span>
                </ChakraLink>
            </Box>
            <Card maxW={cardMaxW} mx='auto'>
                <CardHeader>
                    <Text fontSize='xl' fontWeight='semibold'>{post.data?.title}</Text>
                </CardHeader>
                <CardBody mt={-6}>
                    <Text color='grey'>{post.data?.content}</Text>
                </CardBody>
                <CardFooter mt={-6} ml='auto' color='#bababa' display='flex' flexDir='row' alignItems='center' gap={2}>
                    <MessageSquareIcon /><Text>{post.data?.comments.length}</Text>
                </CardFooter>
            </Card>
            <Center>
                <Button type='submit' colorScheme='blue' w={cardMaxW} mt={4} onClick={onOpen}>Leave a comment</Button>
            </Center>
            <Box mt={8} pb={32}>
                {post.data?.comments.map(comment => {
                    const commentObj = JSON.parse(comment) as PostComment
                    return (
                        <CommentCard data={commentObj} />
                    )
                })}
            </Box>
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
                            <Button colorScheme='blue' mr={3} onClick={handleSubmit} isDisabled={isSubmitDisabled}>Submit</Button>
                            <Button colorScheme='red' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Portal>
            </Modal>
        </Box >
    )
}