import React from 'react'
import { Box, Text, Center, Heading, Stack } from '@chakra-ui/react'
import { cardMaxW } from '../utils/constants'

export default function HelpUsImprovePage() {
    const googleFormEmbedCode = `
  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScJomKCwt2ode2yYR8XBlKogdbUDpV8EOa9_NvhrgC4S1jQ9Q/viewform?embedded=true" width="640" height="421" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>  `

    return (
        <Center h='100vh' mx='auto' py={8}>
            <Stack spacing={8} textAlign='center'>
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
                        src="https://docs.google.com/forms/d/e/1FAIpQLScJomKCwt2ode2yYR8XBlKogdbUDpV8EOa9_NvhrgC4S1jQ9Q/viewform?embedded=true"
                        style={{
                            // marginInline: 'auto',
                            height: '100%',
                            width: '100%'
                        }}
                    >
                        Loading…
                    </iframe>
                </Box>
            </Stack>
        </Center >
    )
}