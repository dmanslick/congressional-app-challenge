import React from 'react';
import { Container, VStack, Heading, Text, SimpleGrid, useColorModeValue, Button, Icon, chakra, Box } from '@chakra-ui/react';
import { motion, MotionProps, isValidMotionProp, useAnimation } from 'framer-motion';
import { FaRobot, FaUsers, FaLightbulb, FaCamera, FaBook } from 'react-icons/fa';
import { IconType } from 'react-icons';
import { useUser } from '../firebase/useUser';
import { useEffect } from 'react';

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
  const motionProps: MotionProps = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.1 * index }
  };

  return (
    <ChakraBox
      {...motionProps}
      whileHover={{ y: -5, transition: { duration: 0.3 } }}
      bg={useColorModeValue('white', 'gray.800')}
      p={6}
      borderRadius="lg"
      boxShadow="md"
      _hover={{ boxShadow: 'lg' }}
    >
      <VStack spacing={4} align="start">
        <Icon as={icon} w={10} h={10} color={useColorModeValue('blue.500', 'blue.300')} />
        <Heading size="md">{title}</Heading>
        <Text color={useColorModeValue('gray.600', 'gray.300')}>{description}</Text>
        <Button
          as="a"
          href={link}
          colorScheme="blue"
          variant="ghost"
          rightIcon={<Icon as={FaRobot} />}
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <ChakraBox bg={bgColor} minHeight="100vh">
      <Container maxW="container.xl" pt={20} pb={16}>
        <VStack spacing={16} align="stretch" as={motion.div} variants={containerVariants} initial="hidden" animate="visible">
          <ChakraBox
            position="relative"
            as={motion.div}
            variants={itemVariants}
            color="white"
            py={16}
            px={8}
            borderRadius="xl"
            boxShadow="xl"
            textAlign="center"
            overflow="hidden"
          >
            <Box
              position="absolute"
              top={0}
              left={0}
              right={0}
              bottom={0}
              bgGradient="linear-gradient(to right, #d799f7, #a699f7, #3f5fe0)"
              zIndex={1}
            />
            <PixelReveal />
            <VStack marginBottom={0} spacing={0} position="relative" zIndex={2}>
              {user && (
                <Text fontSize="xl" fontWeight="medium">
                  Welcome back, {user?.displayName || 'Guest'}
                </Text>
              )}
              <Heading marginBottom={3} marginTop={3} size="3xl">Discover Kora</Heading>
              <Text fontSize="xl" maxW="2xl" mx="auto">
                Empowering parents and caregivers with AI-driven insights and community support for autism understanding.
              </Text>
              <Button size="lg" colorScheme="whiteAlpha" mt={4}>
                Get Started
              </Button>
            </VStack>
          </ChakraBox>

          <VStack spacing={0} align="stretch" as={motion.div} variants={itemVariants}>
            <Heading size="xl" marginBottom={4} textAlign="center" color={textColor}>
              Our Features
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
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
    </ChakraBox>
  );
};

export default HomePage;