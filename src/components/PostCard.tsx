import { Card, CardBody, CardFooter, CardHeader, Tag, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


export default function PostCard(props: Post) {
    return (
        <Link to={`/app/post/${props.id}`}>
            <Card maxW={320} w='100%' mx='auto' userSelect='none' _active={{ bg: '#F7F7F7' }} _hover={{ bg: '#F7F7F7' }}>
                <CardHeader>
                    <Text fontSize='large' fontWeight='medium'>{props.title}</Text>
                </CardHeader>
                <CardBody mt={-8} mb={-6}>
                    <Text fontSize='small' color='grey'>{props.content}</Text>
                </CardBody>
                <CardFooter>
                    <Wrap>
                        {props.tags.map(tag => {
                            return (
                                <WrapItem>
                                    <Tag colorScheme='blue'>{tag}</Tag>
                                </WrapItem>
                            )
                        })}
                    </Wrap>
                </CardFooter>
            </Card>
        </Link>
    )
}