import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AbsoluteCenter, Box, Button, Center, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Portal, Spinner, Stack, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { SearchIcon } from 'lucide-react'
import { getPosts } from '../utils/getPosts'
import PostCard from '../components/PostCard'
import { useUser } from '../firebase/useUser'
import { createPost } from '../utils/createPost'

export default function CommunityPage() {
    const { user } = useUser()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [content, setContent] = useState('')
    const [title, setTitle] = useState('')
    const [tags, setTags] = useState([] as string[])
    const [results, setResults] = useState<Post[] | undefined>(undefined)
    const posts = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
        // refetchInterval: 1000 * 30,
        refetchOnMount: true,
        // staleTime: 1000 * 60,
    })

    const searchPosts = (searchQuery: string) => {
        if (!searchQuery) setResults(undefined)
        const filtered = posts.data?.filter(({ title, content }) => {
            return title.toLowerCase().includes(searchQuery.toLowerCase()) || content.toLowerCase().includes(searchQuery.toLowerCase())
        })
        setResults(filtered)
    }

    const handleCreatePost = async () => {
        try {
            await createPost({ username: user?.displayName as string, title, tags, content })
        } catch (e) {
            console.log('error')
        }
    }

    const handleClose = () => {
        onClose()
        setTitle('')
        setTags([])
        setContent('')
    }

    return (
        <>
            <Box w='100%' bg='blue.500' color='white' pt={4} pb={5} display='flex' flexDir='column' alignItems='center' gap={3} mt='56px'>
                <Text fontWeight='semibold' fontSize='x-large'>Our Community</Text>
                <Box style={{ maxWidth: 320, display: 'flex', flexDirection: 'row', gap: 4 }}>
                    <Input bg='white' color='black' placeholder='Search' onChange={e => searchPosts(e.target.value)} zIndex='revert-layer' />
                    <Button type='submit' aria-label='Search Icon'>
                        <SearchIcon aria-label='Search Button Icon' />
                    </Button>
                </Box>
            </Box>
            <Center>
                <Button mt={4} maxW='320px' w='100%' colorScheme='blue' onClick={onOpen}>Create Post</Button>
            </Center>
            <Box mt={4} pb={20}>
                {posts.isLoading && (
                    <Center>
                        <Spinner color='blue.500' />
                    </Center>
                )}
                <Stack spacing='1rem'>
                    {results ? (
                        <>
                            {results.length == 0 && <AbsoluteCenter><Text>No Results</Text></AbsoluteCenter>}
                            {results.length > 0 && results.map(post => <PostCard {...post} />)}
                        </>
                    ) : (
                        posts.data?.map(post => <PostCard {...post} />)
                    )}
                </Stack>
            </Box>
            <Modal isOpen={isOpen} onClose={handleClose}>
                <Portal>
                    <ModalOverlay />
                    <ModalContent mx='4'>
                        <ModalHeader>Create Post</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <label htmlFor='title' className='visually-hidden'>Post title</label>
                            <Input type='text' placeholder='Title' id='title' mb='1.5rem' onChange={e => setTitle(e.target.value)} />

                            <label htmlFor='tags' className='visually-hidden'>Post tags</label>
                            <Input type='text' placeholder='Tags (ex: tag1, tag2, tag3, ...)' id='tags' mb='1.5rem' onChange={e => setTags(e.target.value.split(/,\s*/))} />

                            <label htmlFor='content' className='visually-hidden'>Post Content</label>
                            <Textarea placeholder='My post' id='content' onChange={e => setContent(e.target.value)} />
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isDisabled={title.length == 0 || content.length == 0}>Submit</Button>
                            <Button colorScheme='red' onClick={handleClose}>Cancel</Button>
                        </ModalFooter>
                    </ModalContent>
                </Portal>
            </Modal>
        </>
    )
}
