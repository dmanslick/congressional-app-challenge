import { Card, CardBody, CardFooter, CardHeader, Tag, Text, Wrap, WrapItem } from '@chakra-ui/react'
import { MessageSquareIcon } from 'lucide-react'
import { Link } from 'react-router-dom'


export default function PostCard(props: Post) {
    return (
        <Card as={Link} to={`/app/post/${props.id}`} maxW={320} w='100%' mx='auto' userSelect='none' _active={{ bg: '#F7F7F7' }} _hover={{ bg: '#F7F7F7' }}>
            <CardHeader>
                <Text fontSize='large' fontWeight='medium'>{props.title}</Text>
            </CardHeader>
            <CardBody mt={-8} mb={-6}>
                <Text fontSize='small' color='grey'>{props.content}</Text>
                <Wrap mt={4}>
                    {props.tags.map(tag => {
                        return (
                            <WrapItem>
                                <Tag colorScheme='blue'>{tag}</Tag>
                            </WrapItem>
                        )
                    })}
                </Wrap>
            </CardBody>
            <CardFooter ml='auto' color='#bababa' display='flex' flexDir='row' alignItems='center' gap={2}>
                <MessageSquareIcon /><Text>{props?.comments?.length}</Text>
            </CardFooter>
        </Card>
    )
}