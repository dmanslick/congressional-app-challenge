import React, { useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  useColorModeValue,
  Button,
  Icon,
  chakra,
  useBreakpointValue,
  Fade,
  ScaleFade,
} from '@chakra-ui/react';
import { motion, isValidMotionProp, useAnimation } from 'framer-motion';
import { FaCamera, FaUsers, FaLightbulb, FaBook, FaRobot } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useUser } from '../firebase/useUser';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

interface FeatureBoxProps {
  title: string;
  description: string;
  icon: IconType;
  link: string;
  index: number;
}

const FeatureBox: React.FC<FeatureBoxProps> = ({ title, description, icon, link, index }) => {
  const motionProps = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.1 * index }
  };

  return (
    <ChakraBox
      {...motionProps}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      borderRadius="lg"
      boxShadow="md"
      _hover={{ boxShadow: 'lg' }}
    >
      <VStack spacing={3} align="start">
        <Icon as={icon} w={8} h={8} color={useColorModeValue('blue.500', 'blue.300')} />
        <Heading size="sm">{title}</Heading>
        <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.300')}>{description}</Text>
        <Button
          as="a"
          href={link}
          colorScheme="blue"
          variant="ghost"
          size="sm"
        >
          Explore
        </Button>
      </VStack>
    </ChakraBox>
  );
};

const PixelReveal: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start(i => ({
      scaleX: 1,
      transition: { duration: 0.5, delay: i * 0.02 },
    }));
  }, [controls]);

  return (
    <Box position="absolute" top={0} left={0} right={0} bottom={0} overflow="hidden">
      {[...Array(50)].map((_, i) => (
        <ChakraBox
          key={i}
          position="absolute"
          top={0}
          left={0}
          right={0}
          height={`${100 / 50}%`}
          transformOrigin="left"
          initial={{ scaleX: 0 }}
          animate={controls}
          custom={i}
          style={{ top: `${(i / 50) * 100}%` }}
          bg="rgba(255, 255, 255, 0.1)"
        />
      ))}
    </Box>
  );
};

const HomePage: React.FC = () => {
    const { user } = useUser();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const textColor = useColorModeValue('gray.800', 'white');
  
    const bannerHeight = useBreakpointValue({ base: '50vh', md: '60vh' });
    const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' });
    const gridColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
  
    return (
      <Box bg={bgColor} minHeight="100vh">
        <Container maxW="container.xl" pt={{ base: 16, md: 20 }} pb={8}>
          <VStack spacing={8} align="stretch">
            <ScaleFade initialScale={0.9} in={true}>
              <ChakraBox
                position="relative"
                color="white"
                py={8}
                px={4}
                borderRadius="xl"
                boxShadow="xl"
                textAlign="center"
                overflow="hidden"
                height={bannerHeight}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={8}
              >
                <Box
                  position="absolute"
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  bgGradient="linear-gradient(to top, #d799f7, #a699f7, #3f5fe0)"
                  zIndex={1}
                />
                <PixelReveal />
                <VStack spacing={4} position="relative" zIndex={2}>
                  {user && (
                    <Fade in={true}>
                      <Text fontSize="lg" fontWeight="medium">
                        Welcome back, {user?.displayName || 'Guest'}
                      </Text>
                    </Fade>
                  )}
                  <Heading size={headingSize}>Discover Kora</Heading>
                  <Text fontSize="md" maxW="xl" mx="auto">
                    Empowering parents and caregivers with AI-driven insights and community support for autism understanding.
                  </Text>
                  <Button size="md" colorScheme="whiteAlpha" mt={2}>
                    Get Started
                  </Button>
                </VStack>
              </ChakraBox>
            </ScaleFade>
  
            <VStack spacing={4} align="stretch">
              <Heading size="xl" textAlign="center" color={textColor}>
                Our Features
              </Heading>
              <SimpleGrid columns={gridColumns} spacing={4}>
                <FeatureBox
                  title="Emotion Detection"
                  description="Understand your child's emotions with advanced AI technology."
                  icon={FaCamera}
                  link="/app/camera"
                  index={0}
                />
                <FeatureBox
                  title="AI Assistant"
                  description="Get personalized support and answers about autism."
                  icon={FaRobot}
                  link="/app/chatbot"
                  index={1}
                />
                <FeatureBox
                  title="Community Forum"
                  description="Connect with other parents and caregivers for support and advice."
                  icon={FaUsers}
                  link="/app/community"
                  index={2}
                />
                <FeatureBox
                  title="Help Us Improve"
                  description="Contribute to our research by submitting photos of your child expressing different emotions."
                  icon={FaLightbulb}
                  link="/app/improve"
                  index={3}
                />
                <FeatureBox
                  title="Learn More About Autism"
                  description="Access resources and expert insights on autism spectrum disorders."
                  icon={FaBook}
                  link="/app/help"
                  index={4}
                />
              </SimpleGrid>
            </VStack>
          </VStack>
        </Container>
      </Box>
    );
  };
  
  export default HomePage;
