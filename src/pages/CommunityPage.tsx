import React, { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spinner,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { getPosts } from '../utils/getPosts';
import PostCard from '../components/PostCard';
import { useUser } from '../firebase/useUser';
import { createPost } from '../utils/createPost';
import { useNavigate } from 'react-router-dom';

const MotionBox = motion(Box);

interface Post {
  id: string;
  title: string;
  content: string;
  username: string;
  tags: string[];
  comments: any[];
}

export default function CommunityPage() {
  const { user } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Post[] | undefined>(undefined);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const posts = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: getPosts,
    refetchOnMount: true,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (id: string, variables: Omit<Post, 'id' | 'comments'>) => {
      const newPost = [{ id, comments: [], ...variables }];
      queryClient.setQueryData<Post[]>(['posts'], (prev = []) => [...prev, ...newPost]);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      onClose();
    }
  });

  const searchPosts = (searchQuery: string) => {
    if (!searchQuery) {
      setSearchResults(undefined);
      return;
    }
    const filtered = posts.data?.filter(({ title, content }) => {
      return title.toLowerCase().includes(searchQuery.toLowerCase()) || content.toLowerCase().includes(searchQuery.toLowerCase());
    });
    setSearchResults(filtered);
  };

  const handleCreatePost = () => {
    if (user?.displayName) {
      mutate({ username: user.displayName, title, tags, content });
    } else {
      console.error('User display name is undefined');
    }
  };

  const handleClose = () => {
    onClose();
    setTitle('');
    setTags([]);
    setContent('');
  };

  return (
    <Box bg={bgColor} minHeight="100vh" pt={{ base: 16, md: 20 }} pb={20}>
      <Container maxW="container.xl">
        <VStack spacing={8} align="stretch">
          <MotionBox
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              bg="linear-gradient(to top, #d799f7, #a699f7, #3f5fe0)"
              color="white"
              p={8}
              borderRadius="xl"
              boxShadow="xl"
              textAlign="center"
            >
              <Heading size="2xl" mb={4}>Our Community</Heading>
              <Text fontSize="lg" mb={6}>Connect, share, and learn with fellow parents and caregivers</Text>
              <Box maxW="480px" mx="auto">
                <Input
                  bg="white"
                  color="black"
                  placeholder="Search posts"
                  onChange={(e) => searchPosts(e.target.value)}
                  mb={4}
                />
              </Box>
            </Box>
          </MotionBox>

          <Flex justify="center" gap={4}>
            <Button colorScheme="purple" onClick={onOpen} leftIcon={<Search />}>
              Create Post
            </Button>
            <Button colorScheme="purple" onClick={() => navigate('/app/chatbot')}>
              Ask Kora AI
            </Button>
          </Flex>

          {posts.isLoading ? (
            <Center>
              <Spinner size="xl" color="blue.500" />
            </Center>
          ) : (
            <AnimatePresence>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                {(searchResults || posts.data)?.map((post, index) => (
                  <MotionBox
                    key={post.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <PostCard {...post} bg={cardBg} />
                  </MotionBox>
                ))}
              </SimpleGrid>
            </AnimatePresence>
          )}

          {searchResults?.length === 0 && (
            <Center>
              <Text fontSize="xl" color={textColor}>No Results</Text>
            </Center>
          )}
        </VStack>
      </Container>

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent mx={4}>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <Input
                placeholder="Tags (comma separated)"
                value={tags.join(', ')}
                onChange={(e) => setTags(e.target.value.split(/,\s*/))}
              />
              <Textarea
                placeholder="Write your post here..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={6}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleCreatePost} isLoading={isPending} isDisabled={!title || !content}>
              Submit
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}