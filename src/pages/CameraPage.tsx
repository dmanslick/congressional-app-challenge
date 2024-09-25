import { useInsertionEffect, useState } from 'react'
import { Camera, CameraResultType } from '@capacitor/camera'
import { AbsoluteCenter, Card, CardBody, Center, Heading, Progress, Spinner, Stack, Text, Image as ChakraImage } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import * as tf from '@tensorflow/tfjs'
import { useModel } from '../providers/ModelProvider'

interface Prediction {
    emotion: string
    confidence: number
}

export default function CameraPage() {
    const [src, setSrc] = useState<undefined | string>(undefined)
    const [predictions, setPredictions] = useState<Prediction[]>()
    const [error, setError] = useState<any>('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const model = useModel()

    const takePicture = async () => {
        try {
            setError(false)
            setLoading(true)
            setPredictions([])
            const image = await Camera.getPhoto({
                quality: 100,
                allowEditing: true,
                resultType: CameraResultType.DataUrl,
                saveToGallery: true
            })

            const img = new Image()
            // @ts-ignore
            img.src = image.dataUrl
            setSrc(image.dataUrl)

            img.onload = async () => {
                const tensor = tf.browser.fromPixels(img)
                    .resizeNearestNeighbor([224, 224])
                    .toFloat()
                    .expandDims()
                    .div(255.0)

                if (model) {
                    try {
                        const prediction = await model.predict(tensor) as tf.Tensor
                        const results = prediction.dataSync()
                        const emotions = ['Fear', 'Sad', 'Happy', 'Angry', 'Neutral']
                        const predictions = emotions.map((emotion, i) => {
                            return { emotion, confidence: results[i] }
                        })
                        setPredictions(predictions)
                        setLoading(false)
                    } catch (error) {
                        console.error('Error during prediction:', error)
                        setError('Error during prediction')
                        setLoading(false)
                    }
                }
            }

        } catch (e: any) {
            if (e.message === 'User cancelled photos app') navigate('/app')
            setError('Error taking picture')
            setLoading(false)
        }
    }

    useInsertionEffect(() => {
        takePicture()
    }, [])

    return (
        <Center h='100vh' maxW='336px' mx='auto'>
            {loading && (
                <AbsoluteCenter>
                    <Spinner color='blue.500' />
                </AbsoluteCenter>
            )}
            {error && (
                <AbsoluteCenter>
                    <Text color='red'>{error}</Text>
                </AbsoluteCenter>
            )}
            {!loading && !error && (
                <Card>
                    <CardBody>
                        <ChakraImage src={src} alt='Image' borderRadius={6} height={256} width={300} objectFit='cover' />
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
