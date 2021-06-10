import React, { useCallback, useEffect, useState } from 'react'
import styles from './CommentListItem.module.scss';
import dayjs from 'dayjs';
import updateLocale from 'dayjs/plugin/updateLocale';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
import advancedFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(advancedFormat);

import { useFirestore } from '../../contexts/firebase/firestore.context';
import { CommentForm, CommentList } from './';

const CommentListItem = ({comment, subjectId, subjectType}) => {
  const [replyClicked, setReplyClicked] = useState(false);
  const handleClick = (e) => {
    setReplyClicked(!replyClicked);
  }

  const [comments, setComments] = useState();
  const { getCommentComments } = useFirestore();

  const fetchData = useCallback(
    async () => {
      try {
        const dbComments = await getCommentComments(subjectType, subjectId, (comment.uid).toString());
        setComments(dbComments);
        console.log(comments)
      } catch (err) {
        console.error(err, (comment.uid).toString())
      }
    },
    [getCommentComments, (comment.uid).toString()]
  );

  useEffect(() => {
    fetchData()
  }, [fetchData]);

  return (
    <div className={styles.CommentListItem}>
      <h3 className={styles.commentTitle}>{comment.title}</h3>
      <p>Posted on: {dayjs(new Date(comment.createdAt)).fromNow()}</p>
      <p>{comment.text}</p>
      <button className={styles.replyButton} onClick={handleClick}>{!replyClicked && 'Reply'}{!!replyClicked && 'Hide'}</button>
      {!!replyClicked && <CommentForm subjectType={subjectType} subjectId={(subjectId).toString()} colType='comments' colId={(comment.uid).toString()}/>}
      {!!comments && comments.length > 0 && comments.map((comment, index) => <CommentList key={index} subjectType='comment' subjectId={comment.uid} comments={comments}/>)}
    </div>
  )
}

export default CommentListItem
