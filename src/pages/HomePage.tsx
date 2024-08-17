import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import { useUser } from '../firebase/useUser'
import FeatureBox from '../components/FeatureBox'

export default function HomePage() {
    const { user } = useUser()

    return (
        <Box mt='20px' pb='4rem'>
            <Box
                bg='blue.500'
                color='white'
                p={25}
                display='flex'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                boxShadow='0 4px 8px 0 rgba(0, 0, 0, 0.2)'
                height='200px'
            >
                {user && (
                    <Text fontSize='3xl' fontWeight='medium' mt={10}>
                        Hello {user?.displayName || 'Guest'}!
                    </Text>
                )}
          <Text
          position='relative'
          fontSize='4xl'
          fontWeight='bold'
          textAlign='center'
          textShadow='0px 2px 1px rgba(0, 0, 0, 0.1)'
          sx={{
            background: 'linear-gradient(to right, #1E25DB,#83A1DB, #ffffff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            '-webkit-text-fill-color': 'transparent'
          }}
        >
          Welcome to Kora
        </Text>
          </Box>

            <Flex wrap='wrap' justifyContent='center' mt={16}>
                <FeatureBox
                    title="Emotion Detection Test"
                    description="Understand your child's emotions with AI. Detect emotions and gain insights."
                    link="/app/camera"
                    buttonText="Try It Out"
                />
                <FeatureBox
                    title="Chat with Kora AI"
                    description="Get personalized support and answers to your questions about autism."
                    link="/app/chatbot"
                    buttonText="Chat Now"
                />
                <FeatureBox
                    title="Join the Community Forum"
                    description="Connect with other parents and caregivers, share experiences, and get advice."
                    link="/app/community"
                    buttonText="Talk with the Community"
                />
                <FeatureBox
                    title="Help Us Improve"
                    description="Contribute to our research by submitting photos of your child expressing different emotions."
                    link="/app/improve"
                    buttonText="Contribute Here"
                />
                <FeatureBox
                    title="Learn More About Autism"
                    description="Find resources, articles, and expert insights to help you understand autism."
                    link="/app/help"
                    buttonText="Click Here"
                />
            </Flex>
        </Box>
    )
}