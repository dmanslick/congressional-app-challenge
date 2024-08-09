import { FormEvent, useState } from 'react';
import { Box, Button, Center, Heading, Input, Text, Flex } from '@chakra-ui/react';
import { SearchIcon } from 'lucide-react';
import { useUser } from '../firebase/useUser';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
    const { user } = useUser();
    const [searchQuery, setSearchQuery] = useState('');

    const searchPosts = (e: FormEvent) => {
        e.preventDefault();
        // Implement search logic here based on your data
        console.log('Search query:', searchQuery); // Replace with your search logic
    };

    return (
        <Box>
            <Box
                bg="blue.500"
                color="white"
                p={25}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)"
                height="200px"
            >
                {user && (
                    <Text fontSize="3xl" fontWeight="medium">
                        Hello {user?.displayName || 'Guest'}!
                    </Text>
                )}
                <Heading>Welcome to Autism App</Heading>
            </Box>

            <Center>
                <form style={{ maxWidth: 320, display: 'flex', flexDirection: 'row', marginTop: '40px', gap: 4 }} onSubmit={searchPosts}>
                    <Input bg='white' color='black' placeholder='Search' onChange={e => setSearchQuery(e.target.value)} zIndex='revert-layer' />
                    <Button type='submit' aria-label='Search Icon'>
                        <SearchIcon aria-label='Search Button Icon' />
                    </Button>
                </form>
            </Center>

            {/* Feature Boxes */}
            <Flex wrap="wrap" justifyContent="center" mt={8} mb={16}>
                <FeatureBox
                    title="Emotion Detection Test"
                    description="Understand your child's emotions with AI. Detect emotions and gain insights."
                    link="/app/camera"
                    buttonText="Try It Out"
                />
                <FeatureBox
                    title="Chat with our AI Assistant"
                    description="Get personalized support and answers to your questions about autism."
                    link="/app/chatbot"
                    buttonText="Chat Now"
                />
                <FeatureBox
                    title="Join the Community Forum"
                    description="Connect with other parents and caregivers, share experiences, and get advice."
                    link="/app/community"
                    buttonText="Find Your Community"
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
    );
};

interface FeatureBoxProps {
    title: string;
    description: string;
    link: string;
    buttonText: string;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ title, description, link, buttonText }) => (
    <Box
        key={title}
        w="300px"
        m={4}
        p={8}
        borderRadius="md"
        bg="white"
        boxShadow="0 4px 8px 0 rgba(0, 0, 0, 0.2)"
    >
        <Box textAlign="center">
            <Text fontWeight="semibold">{title}</Text>
            <Text color="gray.500" fontSize="sm">
                {description}
            </Text>
            <RouterLink to={link}>
                <Button colorScheme="blue" mt={4}>{buttonText}</Button>
            </RouterLink>
        </Box>
    </Box>
);

export default HomePage;
