import { Card, CardBody, CardHeader, Center, Text } from '@chakra-ui/react'
import { cardMaxW } from '../utils/constants'

export default function CommentCard({ data }: { data: PostComment }) {
    return (
        <>
            <Card maxW={cardMaxW} mx='auto' mt='8'>
                <CardHeader>
                    <Text>{data.username}</Text>
                </CardHeader>
                <CardBody mt={-8}>
                    <Text color='grey'>{data.content}</Text>
                </CardBody>
            </Card>
        </>
    )
}