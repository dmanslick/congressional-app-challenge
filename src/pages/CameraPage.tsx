import React, { useState } from 'react'
import { Camera, CameraResultType } from '@capacitor/camera'
import { Box, Button, Card, CardBody, Center, Heading, Image, Progress, Stack, Text } from '@chakra-ui/react'
import { CameraIcon } from 'lucide-react'

interface Prediction {
    emotion: string
    confidence: number
}

export default function CameraPage() {
    const [src, setSrc] = useState<undefined | string>(undefined)
    const [predictions, setPredictions] = useState<Prediction[]>()
    const [error, setError] = useState('')

    const takePicture = async () => {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.DataUrl,
            saveToGallery: true
        })

        const base64String = image.dataUrl?.split('base64,')[1]

        if (base64String?.length as number > 1_500_000) {
            setError('Image file size is too big')
            return
        }

        try {
            const response = await fetch(import.meta.env.VITE_PREDICT_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ imageData: base64String })
            })

            if (!response.ok) {
                setError('Error: Response not status code 200')
                return
            }

            const json = await response.json()
            setSrc(image.dataUrl as string)
            setPredictions(json)
        } catch (e) {
            setError('Error')
        }
    }

    return (
        <Center h='100vh' maxW='336px' mx='auto'>
            {typeof src != 'string' ? (
                <Stack>
                    <Button
                        bg='black'
                        color='white'
                        _hover={{ background: 'blackAlpha.900' }}
                        _active={{ background: 'blackAlpha.800' }}
                        onClick={takePicture}
                        display='flex'
                    >
                        <Box mr={2}>
                            <CameraIcon />
                        </Box>
                        Take Photo
                    </Button>
                    <Text color='red'>{error}</Text>
                </Stack>
            ) : (
                <Card>
                    <CardBody>
                        <Image src={src} alt='Image' borderRadius={6} height={256} width={300} objectFit='cover' />
                        <Heading size='lg' textAlign='center' my='12px'>Feeling</Heading>
                        <Stack textAlign='center'>
                            {predictions?.sort((a, b) => b.confidence - a.confidence).map(({ emotion, confidence }) => {
                                return (
                                    <>
                                        <Text>{emotion}</Text>
                                        <Progress value={Number((confidence * 100).toFixed(2))} />
                                    </>
                                )
                            })}
                        </Stack>
                    </CardBody>
                </Card>
            )}
        </Center>
    )
}
