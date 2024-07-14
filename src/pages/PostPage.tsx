import { Box } from '@chakra-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getPost } from '../utils/getPost'
import { Link as ChakraLink } from '@chakra-ui/react'
import { ChevronLeft } from 'lucide-react'

type Params = {
    id: string
}

export default function PostPage() {
    const { id } = useParams<Params>()

    const post = useQuery({
        queryKey: ['post', id],
        queryFn: () => getPost(id as string),
        refetchInterval: 1000 * 30,
        staleTime: 1000 * 60 * 5,
    })

    return (
        <Box pt='56px'>
            <Box ml={2} mt={3} mb={2}>
                <ChakraLink href='#/app' display='flex' color='blue.500' alignItems='center'>
                    <ChevronLeft height={24} width={24} />Back
                </ChakraLink>
            </Box>
            <p>{id}</p>
        </Box>
    )
}