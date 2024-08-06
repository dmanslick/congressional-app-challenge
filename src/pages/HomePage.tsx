import { Box, Button, Center, Flex, Heading, Text, Link} from '@chakra-ui/react';
import { useUser } from '../firebase/useUser';
import { Link as RouterLink } from 'react-router-dom';

const HomePage = () => {
    const { user } = useUser();
  
    return (
      <Box>
        {/* Blue Banner */}
        <Box
          bg="blue.500"
          color="white"
          p={25}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center" // Center content vertically
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

      {/* Feature Boxes */}
      <Flex wrap="wrap" justifyContent="center" mt={16}>
        <FeatureBox
          title="Chat with our AI Assistant"
          description="Get personalized support and answers to your questions about autism."
          link="/chatbot"
          buttonText="Chat Now"
        />
        <FeatureBox
          title="Join the Community Forum"
          description="Connect with other parents and caregivers, share experiences, and get advice."
          link="/community"
          buttonText="Find Your Community"
        />
        <FeatureBox
          title="Help Us Improve"
          description="Contribute to our research by submitting photos of your child expressing different emotions."
          link="/help-us-improve"
          buttonText="Contribute Here"
        />
        <FeatureBox
          title="Take a Detection Test"
          description="Use our camera to capture your child's play and get insights into their developmental stage."
          link="/camera-for-detection"
          buttonText="Try It Out"
        />
        <FeatureBox
          title="Learn More About Autism"
          description="Find resources, articles, and expert insights to help you understand autism."
          link="/find-help"
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
    key={title} // For accessibility
    w="300px"
    m={4}
    p={8}
    borderRadius="md" // Change to 'md' for rounded corners
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
