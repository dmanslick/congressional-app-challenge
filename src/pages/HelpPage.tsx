import React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Image,
  Select,
  SimpleGrid,
  Container,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Card,
  CardBody,
  CardFooter,
} from '@chakra-ui/react';
import { ChevronRight } from 'lucide-react';

interface AutismCenterProps {
  name: string;
  image: string;
  location: string;
  phone: string;
}

const AutismCenter: React.FC<AutismCenterProps> = ({ name, image, location, phone }) => (
  <Card maxW="sm" boxShadow="md" borderRadius="lg" overflow="hidden">
    <Image src={image} alt={name} height="150px" objectFit="cover" />
    <CardBody>
      <Heading size="md" mb={2}>{name}</Heading>
      <Text fontSize="sm" mb={1}>{location}</Text>
      <Text fontSize="sm" fontWeight="bold">{phone}</Text>
    </CardBody>
  </Card>
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
      <Card
        direction="column"
        overflow="hidden"
        variant="outline"
        cursor="pointer"
        onClick={onOpen}
        _hover={{ boxShadow: 'md' }}
        transition="all 0.2s"
      >
        <CardBody>
          <Heading size="sm" mb={2}>{title}</Heading>
          <Text fontSize="sm" noOfLines={2}>{description}</Text>
        </CardBody>
        <CardFooter>
          <Button rightIcon={<ChevronRight size={16} />} colorScheme="blue" size="sm">
            Read More
          </Button>
        </CardFooter>
      </Card>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb={4}>{description}</Text>
            <Button as="a" href={url} target="_blank" colorScheme="blue">
              Read Full Article
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

const HelpPage: React.FC = () => {
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

  return (
    <Box>
      <Box bg="blue.500" color="white" py={8} px={4} textAlign="center">
        <Heading as="h1" size="xl" mb={1} mt={12}>
          Need Some HELP?
        </Heading>
        <Text fontSize="lg">Kora is here!</Text>
      </Box>

      <Container maxW="container.xl" py={8}>
        <VStack spacing={12} align="stretch">
          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Popular Autism Centers
            </Heading>
            <Flex overflowX="auto" pb={4}>
              <HStack spacing={4}>
                {autismCenters.map((center, index) => (
                  <AutismCenter key={index} {...center} />
                ))}
              </HStack>
            </Flex>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Quick Links
            </Heading>
            <Select
              placeholder="Select a resource"
              bg="white"
              borderColor="blue.500"
              _hover={{ borderColor: "blue.600" }}
              onChange={(e) => window.open(e.target.value, '_blank')}
            >
              {quickLinks.map((link, index) => (
                <option key={index} value={link.url}>
                  {link.label}
                </option>
              ))}
            </Select>
          </Box>

          <Box>
            <Heading as="h2" size="lg" mb={4}>
              Learn More
            </Heading>
            <SimpleGrid columns={[1, 2, 3, 4]} spacing={6}>
              {articles.map((article, index) => (
                <ArticlePreview key={index} {...article} />
              ))}
            </SimpleGrid>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

export default HelpPage;