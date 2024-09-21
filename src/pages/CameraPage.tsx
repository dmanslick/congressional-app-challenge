import React, { useState, useEffect } from 'react';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Box, Container, VStack, Heading, Text, Button, Image as ChakraImage, useColorModeValue, chakra } from '@chakra-ui/react';
import { motion, isValidMotionProp, useAnimation } from 'framer-motion';
import * as tf from '@tensorflow/tfjs';
import { useModel } from '../providers/ModelProvider';
import { FaCamera } from 'react-icons/fa';

const ChakraBox = chakra(motion.div, {
  shouldForwardProp: (prop) => isValidMotionProp(prop) || prop === 'children',
});

interface Prediction {
  emotion: string;
  confidence: number;
}

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

export default function CameraPage() {
  const [src, setSrc] = useState<undefined | string>(undefined);
  const [predictions, setPredictions] = useState<Prediction[]>();
  const [error, setError] = useState<any>('');
  const [loading, setLoading] = useState(false);
  const model = useModel();

  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const cardBg = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  const takePicture = async () => {
    try {
      setError(false);
      setLoading(true);
      setPredictions([]);
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
        saveToGallery: true
      });

      const img = new Image();
      img.src = image.dataUrl as string;
      setSrc(image.dataUrl);

      img.onload = async () => {
        const tensor = tf.browser.fromPixels(img)
          .resizeNearestNeighbor([224, 224])
          .toFloat()
          .expandDims()
          .div(255.0);

        if (model) {
          try {
            const prediction = await model.predict(tensor) as tf.Tensor;
            const results = prediction.dataSync();
            const emotions = ['Fear', 'Sad', 'Happy', 'Angry', 'Neutral'];
            const predictions = emotions.map((emotion, i) => {
              return { emotion, confidence: results[i] };
            });
            setPredictions(predictions);
            setLoading(false);
          } catch (error) {
            console.error('Error during prediction:', error);
            setError('Error during prediction');
            setLoading(false);
          }
        }
      };

    } catch (e: any) {
      setError('Error taking picture');
      setLoading(false);
    }
  };

  return (
    <ChakraBox bg={bgColor} minHeight="100vh" position="relative">
      <Container maxW="container.xl" pt={20} pb={16}>
        <VStack spacing={8} align="stretch">
          <ChakraBox
            position="relative"
            color="white"
            py={16}
            px={8}
            borderRadius="xl"
            boxShadow="xl"
            textAlign="center"
            overflow="hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
            <VStack spacing={4} position="relative" zIndex={2}>
              <Heading size="2xl">Emotion Detection</Heading>
              <Text fontSize="xl">Capture and analyze emotions in real-time</Text>
            </VStack>
          </ChakraBox>

          <ChakraBox
            bg={cardBg}
            p={6}
            borderRadius="lg"
            boxShadow="md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <VStack spacing={6}>
              <Button
                leftIcon={<FaCamera />}
                onClick={takePicture}
                size="lg"
                colorScheme="purple"
                isLoading={loading}
              >
                {src ? 'Take Another Picture' : 'Take Picture'}
              </Button>

              {error && (
                <Text color="red.500" textAlign="center">{error}</Text>
              )}

              {src && (
                <ChakraImage src={src} alt="Captured Image" borderRadius={6} maxH="300px" objectFit="cover" />
              )}

              {predictions && (
                <VStack spacing={4} width="100%">
                  <Heading size="lg" color={textColor}>Detected Emotions</Heading>
                  {predictions.sort((a, b) => b.confidence - a.confidence).map(({ emotion, confidence }) => (
                    <Box key={emotion} width="100%">
                      <Text color={textColor} mb={2}>{emotion}</Text>
                      <ChakraBox
                        width="100%"
                        height="20px"
                        bg="gray.200"
                        borderRadius="full"
                        overflow="hidden"
                      >
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${confidence * 100}%` }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          style={{
                            height: "100%",
                            backgroundColor: "purple",
                          }}
                        />
                      </ChakraBox>
                    </Box>
                  ))}
                </VStack>
              )}
            </VStack>
          </ChakraBox>
        </VStack>
      </Container>
    </ChakraBox>
  );
}