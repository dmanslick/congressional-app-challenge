import React from 'react';
import { Box, Text, Center, Heading } from '@chakra-ui/react';

const HelpUsImprove = () => {
  const googleFormEmbedCode = `
  <iframe src="https://docs.google.com/forms/d/e/1FAIpQLScJomKCwt2ode2yYR8XBlKogdbUDpV8EOa9_NvhrgC4S1jQ9Q/viewform?embedded=true" width="640" height="421" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>  `;

  return (
    <Center h="100vh" maxW="container.lg" py={8}>
      <Box textAlign="center" mb={8}>
        <Heading>Help Us Improve</Heading>
        <Text>
          Submit photos of your child expressing different emotions to help us
          train our emotion recognition model.
        </Text>
      </Box>
      <div dangerouslySetInnerHTML={{ __html: googleFormEmbedCode }} />
    </Center>
  );
};

export default HelpUsImprove;
