import { AbsoluteCenter, Box, Spinner } from '@chakra-ui/react'

export default function PageLoader() {
    return (
        <Box minH='100vh'>
            <AbsoluteCenter>
                <Spinner color='blue.500' />
            </AbsoluteCenter>
        </Box>
    )
}