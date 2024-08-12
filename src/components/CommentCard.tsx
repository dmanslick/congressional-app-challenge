import { Card, CardBody, CardHeader, IconButton, Menu, MenuButton, MenuItem, MenuList, Portal, Text } from '@chakra-ui/react'
import { cardMaxW } from '../utils/constants'
import { useUser } from '../firebase/useUser'
import { EllipsisVerticalIcon } from 'lucide-react'
import { deleteComment } from '../utils/deleteComment'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export default function CommentCard({ data, postId }: { data: PostComment, postId: string }) {
    const { user } = useUser()
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: deleteComment,
        onSuccess: (_, { id }: DeleteCommentArgs) => {
            queryClient.setQueryData(['post', postId], (prev: Post) => {
                const updatedComments = prev.comments.filter((comment: any) => JSON.parse(comment).id != id)
                console.log(updatedComments)
                return { ...prev, comments: updatedComments }
            })
        }
    })

    const handleDeleteComment = () => mutate({ username: user?.displayName as string, content: data.content, id: data.id, postId })

    return (
        <>
            <Card maxW={cardMaxW} mx='auto' mt='4'>
                <CardHeader display='flex' flexDir='row' alignItems='center' justifyContent='space-between'>
                    <Text>{data.username}</Text>
                    {data.username == user?.displayName && (
                        <Menu autoSelect={false}>
                            <MenuButton
                                as={IconButton}
                                aria-label='Options'
                                icon={<EllipsisVerticalIcon />}
                                variant='ghost'
                                size='xs'
                            />
                            <Portal>
                                <MenuList>
                                    <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
                                    <MenuItem>Edit</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    )}
                </CardHeader>
                <CardBody mt={-8}>
                    <Text color='grey'>{data.content}</Text>
                </CardBody>
            </Card>
        </>
    )
}