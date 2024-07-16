import { useEffect, useInsertionEffect, useRef, useState } from 'react'
import { Camera, CameraResultType } from '@capacitor/camera'
import { AbsoluteCenter, Card, CardBody, Center, Heading, Progress, Spinner, Stack, Text, Image as ChakraImage } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import * as tf from '@tensorflow/tfjs'

interface Prediction {
    emotion: string
    confidence: number
}

const loadModel = async () => {
    const loadedModel = await tf.loadGraphModel('/model.json')
    return loadedModel
}
export default function CameraPage() {
    const [src, setSrc] = useState<undefined | string>(undefined)
    const [predictions, setPredictions] = useState<Prediction[]>()
    const [error, setError] = useState<any>('')
    const loading = typeof error == 'string' || typeof src != 'string'
    const navigate = useNavigate()
    const model = useRef<tf.GraphModel | null>(null)

    const takePicture = async () => {
        try {
            setError(false)
            const image = await Camera.getPhoto({
                quality: 90,
                allowEditing: true,
                resultType: CameraResultType.DataUrl,
                saveToGallery: true
            })

            const img = new Image()
            // @ts-ignore
            img.src = image.dataUrl

            img.onload = async () => {
                console.log(img)
                // console.log('Image loaded')
                const tensor = tf.browser.fromPixels(img)
                    .resizeNearestNeighbor([224, 224])
                    .toFloat()
                    .expandDims()
                    .div(255.0)

                console.log('About to predict')
                try {
                    const prediction = await model.current?.predict(tensor) as tf.Tensor
                    console.log(prediction.dataSync())
                } catch (error) {
                    console.error('Error during prediction:', error)
                    setError('Error during prediction')
                }
            }

        } catch (e: any) {
            if (e.message === 'User cancelled photos app') navigate('/app')
            setError('Error taking picture')
        }
    }


    useInsertionEffect(() => {
        takePicture()
    }, [])

    useEffect(() => {
        loadModel().then(loaded => {
            console.log('loaded')
            model.current = loaded
        })

        return () => {
            if (model.current) {
                model.current.dispose()
            }
        }
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
            {typeof src == 'string' && (
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
