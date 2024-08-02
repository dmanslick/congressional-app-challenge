import React from 'react';
import { Box, Text, Center, Heading, Stack } from '@chakra-ui/react';

const HelpUsImprove = () => {
  const googleFormEmbedCode = `
  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeGI3ZsOuwaHQI-RPd4MEdAvsEI9u6QZmmEYBcAHg0gCrZbzw/viewform?embedded=true" width="640" height="421" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>  `;

  return (
    <Center h="100vh" maxW="container.lg" py={8}>
      <Stack spacing={8} textAlign="center">
        <Heading>Help Us Improve</Heading>
        <Text>
          Please help us improve our emotion recognition model by submitting photos
          of your child expressing different emotions. This data will be used to
          train and refine our model, ultimately leading to a more accurate and
          reliable experience for everyone.
        </Text>
      </Stack>
      <div dangerouslySetInnerHTML={{ __html: googleFormEmbedCode }} />
    </Center>
  );
};

export default HelpUsImprove;

