import { Box, Text } from '@chakra-ui/react'

export default function BotMessage({ text }: { text: string }) {
    return (
        <Box bg='blue.500' rounded='md' maxW='50%' color='white' p='3' ml='auto' my='2'>
            <Text>{text}</Text>
        </Box>
    )
}