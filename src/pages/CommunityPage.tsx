import { FormEvent, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Box, Button, Center, Input, Spinner, Text } from '@chakra-ui/react'
import { SearchIcon } from 'lucide-react'
import { getPosts } from '../utils/getPosts'
import PostCard from '../components/PostCard'

export default function CommunityPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [results, setResults] = useState<Post[] | undefined>(undefined)
    const posts = useQuery({
        queryKey: ['posts'],
        queryFn: () => getPosts(),
        // refetchInterval: 1000 * 30,
        refetchOnMount: true,
        staleTime: 1000 * 60,
    })

    const searchPosts = (e: FormEvent) => {
        e.preventDefault()
        if (!searchQuery) setResults(undefined)
        const filtered = posts.data?.filter(({ title, content }) => {
            return title.toLowerCase().includes(searchQuery.toLowerCase()) || content.toLowerCase().includes(searchQuery.toLowerCase())
        })
        setResults(filtered)
    }

    return (
        <>
            <Box w='100%' bg='blue.500' color='white' pt={4} pb={5} display='flex' flexDir='column' alignItems='center' gap={3} mt='56px'>
                <Text fontWeight='semibold' fontSize='x-large'>Our Community</Text>
                <form style={{ maxWidth: 320, display: 'flex', flexDirection: 'row', gap: 4 }} onSubmit={searchPosts}>
                    <Input bg='white' color='black' placeholder='Search' onChange={e => setSearchQuery(e.target.value)} zIndex='revert-layer' />
                    <Button type='submit' aria-label='Search Icon'>
                        <SearchIcon aria-label='Search Button Icon' />
                    </Button>
                </form>
            </Box>
            <Center>
                <Button mt={4} maxW='320px' w='100%' colorScheme='blue'>Create Post</Button>
            </Center>
            <Box mt={4}>
                {posts.isLoading && (
                    <Center>
                        <Spinner color='blue.500' />
                    </Center>
                )}
                {results && (
                    results.map(post => <PostCard {...post} />)
                )}
                {posts && (
                    posts.data?.map(post => <PostCard {...post} />)
                )}
            </Box>
        </>
    )
}
