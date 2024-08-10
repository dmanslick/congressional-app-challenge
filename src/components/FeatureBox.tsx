import { Button, Box, Text } from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function FeatureBox({ title, description, link, buttonText }: { title: string, description: string, link: string, buttonText: string }) {
    return (
        <Box
            key={title}
            w='300px'
            m={4}
            p={8}
            borderRadius='md'
            bg='white'
            boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2)'
        >
            <Box textAlign='center'>
                <Text fontWeight='semibold'>{title}</Text>
                <Text color='gray.500' fontSize='sm'>
                    {description}
                </Text>
                <RouterLink to={link}>
                    <Button colorScheme='blue' mt={4}>{buttonText}</Button>
                </RouterLink>
            </Box>
        </Box>
    )
}