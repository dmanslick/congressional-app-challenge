import { Box, Text, Center, Heading, Stack } from '@chakra-ui/react'
import { cardMaxW } from '../utils/constants'

export default function HelpUsImprovePage() {
    return (
        <Center minH='100vh' mx='auto' py={16}>
            <Stack spacing={8} textAlign='center' mt={6}>
                <Heading>Help Us Improve</Heading>
                <Text maxW={cardMaxW} mx='auto' textAlign='center'>
                    Please help us improve our emotion recognition model by submitting photos
                    of your child expressing different emotions.This data will be used to
                    train and refine our model, ultimately leading to a more accurate and
                    reliable experience for everyone.
                </Text>
                <Box
                    width='100%'
                    mx='auto'
                >
                    <iframe
                        src='https://docs.google.com/forms/d/e/1FAIpQLSeGI3ZsOuwaHQI-RPd4MEdAvsEI9u6QZmmEYBcAHg0gCrZbzw/viewform?embedded=true'
                        style={{
                            height: 1212,
                            width: '100%',
                        }}
                    >
                        Loading…
                    </iframe>
                </Box>
            </Stack>
        </Center >
    )
}