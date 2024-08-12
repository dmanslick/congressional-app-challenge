import { FormEvent, useState } from 'react'
import { AbsoluteCenter, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, IconButton, Menu, MenuButton, MenuItem, MenuList, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, Spinner, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getPost } from '../utils/getPost'
import { Link as ChakraLink } from '@chakra-ui/react'
import { ChevronLeft, EllipsisIcon, MessageSquareIcon } from 'lucide-react'
import CommentCard from '../components/CommentCard'
import { createComment } from '../utils/createComment'
import { useUser } from '../firebase/useUser'
import { cardMaxW } from '../utils/constants'
import { deletePost } from '../utils/deletePost'

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
    const navigate = useNavigate()

    const post = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id as string),
        // refetchInterval: 1000 * 30,
        refetchOnMount: 'always',
        staleTime: 1000 * 60,
    })

    const { mutate: mutateCreateComment, error: mutateCreateCommentError } = useMutation({
        mutationFn: createComment,
        onSuccess: (_, { username, content, commentId }: any) => {
            queryClient.setQueryData(['post', id], (prev: Post) => {
                const newComments = [...prev.comments, JSON.stringify({ username, content, id: commentId })]
                return { ...prev, comments: newComments }
            })
        }
    })

    const { mutate: mutateDeletePost, error: mutateDeletePostError } = useMutation({
        mutationFn: deletePost,
        onSuccess: (_, { id }: any) => {
            queryClient.setQueryData(['posts'], (prev: Post[]) => {
                prev.filter(old => old.id == id)
            })
            navigate('/app/community')
        }
    })

    const handleCreateComment = (e: FormEvent) => {
        e.preventDefault()
        // @ts-ignore
        if (content != '') mutateCreateComment({ id, content, username: user?.displayName, commentId: crypto.randomUUID() })
        onClose()
    }

    const handleDeletePost = () => mutateDeletePost({ id })

    if (post.error || mutateCreateCommentError || mutateDeletePostError) {
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

    const goBack = () => navigate(-1)

    return (
        <Box pt='56px'>
            <Box ml={2} my={4} w='fit-content'>
                <ChakraLink as={Link} onClick={goBack} display='flex' color='blue.500' alignItems='center'>
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
                <CardFooter mt={-6} ml='auto' color='#bababa' display='flex' flexDir='row' justifyContent='space-between' w='100%'>
                    {post.data?.username == user?.displayName && (
                        <Menu autoSelect={false}>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<EllipsisIcon />}
                                variant='ghost'
                                size='xs'
                            />
                            <Portal>
                                <MenuList>
                                    <MenuItem onClick={handleDeletePost}>Delete</MenuItem>
                                    <MenuItem>Edit</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    )}
                    <Box display='flex' flexDir='row' alignItems='center' gap={2}>
                        <MessageSquareIcon /><Text>{post.data?.comments.length}</Text>
                    </Box>
                </CardFooter>
            </Card>
            <Center>
                <Button type='submit' colorScheme='blue' w={cardMaxW} mt={4} onClick={onOpen}>Leave a comment</Button>
            </Center>
            <Box mt={8} pb={28}>
                {post.data?.comments.map(comment => {
                    const commentObj = JSON.parse(comment) as PostComment
                    return (
                        <CommentCard data={commentObj} postId={id as string} />
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
                            <Button colorScheme='blue' mr={3} onClick={handleCreateComment} isDisabled={isSubmitDisabled}>Submit</Button>
                            <Button colorScheme='red' onClick={onClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Portal>
            </Modal>
        </Box >
    )
}