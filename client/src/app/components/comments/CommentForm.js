import React, { useCallback, useEffect, useState } from 'react';
import { FiSend } from 'react-icons/fi';
import styles from './CommentForm.module.scss';
import { useFirestore } from '../../contexts/firebase/firestore.context';

const CommentForm = ({subjectType, subjectId, colType = null, colId = null}) => {
  const [dbComment, setDbComment] = useState();
  const { addCommentToRef } = useFirestore();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    let commentData = [];
    for (let entry of data) {
      const [, value] = entry;
      commentData.push(value);
    };
    // console.log(commentData)
    const [ comment ] = commentData;
    const d = Date.now();
    const commentBody = {
      createdAt: d,
      deletedAt: null,
      modifiedAt: null,
      spammedDate: null,
      text: comment
    };
    setDbComment(commentBody);
  };

  const fetchData = useCallback(
    async () => {
      console.log(dbComment)
      try {
        const data = await addCommentToRef(subjectType, (subjectId).toString(), colType, colId, dbComment);
        console.log(data);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    [addCommentToRef, dbComment, colId, colType, (subjectId).toString(), subjectType]
  );

  useEffect(() => {
    !!dbComment && fetchData()
  }, [fetchData]);

  return (
    <form className={styles.CommentForm} onSubmit={handleSubmit}>
      <textarea name="commentText" placeholder='Leave a comment...' required></textarea>
      <button type="submit" value="Submit"><FiSend /></button>
    </form>
  )
}

export default CommentForm
