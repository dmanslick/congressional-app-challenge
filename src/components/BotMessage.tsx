import { Box, Text } from '@chakra-ui/react'

export default function BotMessage({ text }: { text: string }) {
    return (
        <Box bg='gray.500' rounded='md' w='50%' color='white' p='3' my='2'>
            <Text>{text}</Text>
        </Box>
    )
}