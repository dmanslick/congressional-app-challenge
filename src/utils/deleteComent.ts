import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export const deleteComment = async ({ commentId, postId }: DeleteCommentArgs) => {
  await deleteDoc(doc(db, 'posts', postId, 'comments', commentId));
  return { commentId, postId }; // Return data for mutation success callback
};

interface DeleteCommentArgs {
  commentId: string;
  postId: string;
}
