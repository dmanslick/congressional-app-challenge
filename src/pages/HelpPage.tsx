import React, { useEffect } from 'react';
import { 
  Box, Heading, Text, VStack, HStack, Image, Select, SimpleGrid, Container, 
  useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, 
  ModalCloseButton, Button, Flex, Card, CardBody, CardFooter, Accordion, 
  AccordionItem, AccordionButton, AccordionPanel, ModalFooter, useColorModeValue,
  useBreakpointValue, ScaleFade
} from '@chakra-ui/react';
import { motion, AnimatePresence, useAnimation, isValidMotionProp } from 'framer-motion';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { chakra } from '@chakra-ui/react';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

const MotionBox = motion(Box);
const MotionSimpleGrid = motion(SimpleGrid);

const autismCenters: AutismCenterProps[] = [
    { name: "Autism Center A", image: "/api/placeholder/300/200", location: "New York, NY", phone: "(123) 456-7890" },
    { name: "Autism Center B", image: "/api/placeholder/300/200", location: "Los Angeles, CA", phone: "(987) 654-3210" },
    { name: "Autism Center C", image: "/api/placeholder/300/200", location: "Chicago, IL", phone: "(456) 789-0123" },
    { name: "Autism Center D", image: "/api/placeholder/300/200", location: "Houston, TX", phone: "(789) 012-3456" },
];

const quickLinks: { label: string; url: string }[] = [
    { label: "Autism Symptoms", url: "#" },
    { label: "Treatment Options", url: "#" },
    { label: "Support Groups", url: "#" },
    { label: "Educational Resources", url: "#" },
];

const articles: ArticlePreviewProps[] = [
    {
        title: "Understanding Autism Spectrum Disorder",
        description: "Learn about the characteristics and challenges of autism spectrum disorder.",
        url: "#"
    },
    {
        title: "Early Signs of Autism in Children",
        description: "Recognize the early indicators of autism in young children.",
        url: "#"
    },
    {
        title: "Autism and Social Skills Development",
        description: "Strategies for improving social interactions for individuals with autism.",
        url: "#"
    },
    {
        title: "Supporting Autistic Adults in the Workplace",
        description: "Tips for employers and colleagues to create an inclusive work environment.",
        url: "#"
    },
];

const faqData = [
    {
        question: "What are the signs of autism in children?",
        answer: "Early signs of autism in children can include difficulty with communication, social interaction, and repetitive behaviors. If you have concerns, speak to your child's doctor or just ask Kora AI!",
    },
    {
        question: "What types of support are available for children with autism?",
        answer: "There are various support options available, including therapy, educational programs, and social skills groups. Talk to your child's doctor or a specialist to determine the best approach.",
    },
    {
        question: "How can I get financial help for raising a child with autism?",
        answer: "Financial assistance options may vary depending on your location. You can explore government programs, disability benefits, and fundraising options.",
    },
];

interface AutismCenterProps {
    name: string;
    image: string;
    location: string;
    phone: string;
}

const AutismCenter: React.FC<AutismCenterProps> = ({ name, image, location, phone }) => (
    <MotionBox
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
    >
        <Card maxW='sm' boxShadow='md' borderRadius='lg' overflow='hidden'>
            <Image src={image} alt={name} height='150px' objectFit='cover' />
            <CardBody>
                <Heading size='md' mb={2}>{name}</Heading>
                <Text fontSize='sm' mb={1}>{location}</Text>
                <Text fontSize='sm' fontWeight='bold'>{phone}</Text>
            </CardBody>
        </Card>
    </MotionBox>
);

interface ArticlePreviewProps {
    title: string;
    description: string;
    url: string;
}

const ArticlePreview: React.FC<ArticlePreviewProps> = ({ title, description, url }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            <MotionBox
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.2 }}
            >
                <Card
                    direction='column'
                    overflow='hidden'
                    variant='outline'
                    cursor='pointer'
                    onClick={onOpen}
                    h="100%"
                    _hover={{ boxShadow: 'lg' }}
                >
                    <CardBody>
                        <Heading size='md' mb={2}>{title}</Heading>
                        <Text fontSize='sm' noOfLines={2}>{description}</Text>
                    </CardBody>
                    <CardFooter mt="auto">
                        <Button rightIcon={<ChevronRight size={16} />} colorScheme='blue' size='sm'>
                            Read More
                        </Button>
                    </CardFooter>
                </Card>
            </MotionBox>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{title}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text mb={4}>{description}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button as='a' href={url} target='_blank' colorScheme='blue' mr='auto'>
                            Read Full Article
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
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

export default function HelpPage() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBgColor = useColorModeValue('white', 'gray.800');
    const textColor = useColorModeValue('gray.800', 'white');
    const bannerHeight = useBreakpointValue({ base: '50vh', md: '60vh' });
    const headingSize = useBreakpointValue({ base: '2xl', md: '3xl' });

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
                                <Heading size={headingSize}>Need Some Help?</Heading>
                                <Text fontSize="md" maxW="xl" mx="auto">
                                    Kora is here to support you on your journey with autism understanding and care.
                                </Text>
                                <Button
                                    as="a"
                                    href="/app/chatbot"
                                    size="md"
                                    colorScheme="whiteAlpha"
                                    mt={2}
                                    _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
                                    transition="all 0.3s"
                                >
                                    Ask Kora AI
                                </Button>
                            </VStack>
                        </ChakraBox>
                    </ScaleFade>

                    <VStack spacing={12} align="stretch">
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Heading as="h2" size="lg" mb={4}>
                                Quick Links
                            </Heading>
                            <Select
                                placeholder="Select a resource"
                                bg={cardBgColor}
                                onChange={(e) => window.open(e.target.value, '_blank')}
                                size="lg"
                            >
                                {quickLinks.map((link, index) => (
                                    <option key={index} value={link.url}>
                                        {link.label}
                                    </option>
                                ))}
                            </Select>
                        </MotionBox>

                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <Heading as="h2" size="lg" mb={6}>
                                Learn More
                            </Heading>
                            <MotionSimpleGrid 
                                columns={{ base: 1, md: 2, lg: 3, xl: 4 }} 
                                spacing={6}
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: { opacity: 0 },
                                    visible: {
                                        opacity: 1,
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                {articles.map((article, index) => (
                                    <MotionBox
                                        key={index}
                                        variants={{
                                            hidden: { opacity: 0, y: 20 },
                                            visible: { opacity: 1, y: 0 }
                                        }}
                                    >
                                        <ArticlePreview {...article} />
                                    </MotionBox>
                                ))}
                            </MotionSimpleGrid>
                        </MotionBox>

                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            marginBottom={10}
                        >
                            <Heading as="h2" size="lg" mb={6} textAlign="center">
                                Frequently Asked Questions
                            </Heading>
                            <Accordion allowMultiple>
                                {faqData.map((item, index) => (
                                    <AccordionItem key={index} border="none" mb={4}>
                                        {({ isExpanded }) => (
                                            <>
                                                <AccordionButton
                                                    bg={cardBgColor}
                                                    _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                                                    borderRadius="md"
                                                    p={4}
                                                >
                                                    <Box flex="1" textAlign="left" fontWeight="semibold">
                                                        {item.question}
                                                    </Box>
                                                    <AnimatePresence>
                                                        <motion.div
                                                            key={isExpanded ? 'minus' : 'plus'}
                                                            initial={{rotate: 0}}
                                                            animate={{rotate: isExpanded ? 180 : 0}}
                                                            exit={{rotate: 0}}
                                                            transition={{duration: 0.2}}
                                                        >
                                                            <ChevronDown />
                                                        </motion.div>
                                                    </AnimatePresence>
                                                </AccordionButton>
                                                <AccordionPanel pb={4} pt={2} px={4}>
                                                    {item.answer}
                                                </AccordionPanel>
                                            </>
                                        )}
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </MotionBox>
                    </VStack>
                </VStack>
            </Container>
        </Box>
    );
}