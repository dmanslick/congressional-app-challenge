import React, { useState, useEffect } from 'react';
import { Box, Center, Button, Flex, Input, Text } from '@chakra-ui/react';
import axios from 'axios';
import { GoogleGenerativeAI, SafetySetting } from '@google/generative-ai';

interface Message {
  sender: string;
  content: string;
}

function ChatBotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState('');

  const sendMessage = async (message: string) => {
    setUserInput('');
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.error("API key is missing");
      // display an error message to the user
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: "text/plain",
    };

    const safetySettings: SafetySetting[] = [];

    const parts = [
      { text: message },
    ];

    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
      });
      const botResponse = result.response.text();

      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'User', content: message },
        { sender: 'Bot', content: botResponse },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setMessages(prevMessages => [
        ...prevMessages,
        { sender: 'Bot', content: "Sorry, I encountered an error. Please try again later." },
      ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      sendMessage(userInput);
    }
  };

  useEffect(() => {
    const fetchInitialMessage = async () => {
      try {
        const response = await axios.get('/api/chatbot/initial'); // Replace with your API endpoint
        setMessages([{ sender: 'Bot', content: response.data }]);
      } catch (error) {
        console.error("Error fetching initial message:", error);
      }
    };
    fetchInitialMessage();
  }, []);

  return (
    <Box>
      <Box bg="teal.500" color="white" p={4} textAlign="center">
        <Text fontSize="lg" fontWeight="bold">Chat with our expert AI for extra help!</Text>
      </Box>
      <Center mt={4}>
        <Flex direction='column' gap={4}>
          {messages.map((message, index) => (
            <Text key={index}>
              {message.sender === 'User' ? (
                <Text color='blue.500'>You: {message.content}</Text>
              ) : (
                <Text color='gray.500'>Bot: {message.content}</Text>
              )}
            </Text>
          ))}
        </Flex>
        <Box ml={2}>
          <Input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
          />
          <Button onClick={() => sendMessage(userInput)} mt={2}>Send</Button>
        </Box>
      </Center>
    </Box>
  );
}

export default ChatBotPage;
