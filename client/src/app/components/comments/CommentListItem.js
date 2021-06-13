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
  const [readMore, setReadMore] = useState(false);

  const handleReply = (e) => {
    setReplyClicked(!replyClicked);
  }

  const handleReadMore = (e) => {
    setReadMore(!readMore);
  }

  const [comments, setComments] = useState();
  const { getCommentComments } = useFirestore();

  const fetchData = useCallback(
    async () => {
      try {
        const dbComments = await getCommentComments(subjectType, subjectId, (comment.uid).toString());
        setComments(dbComments);
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
      <p>Posted on: <strong>{dayjs(new Date(comment.createdAt)).fromNow()}</strong></p>
      {!readMore && <p>{(comment.text).slice(0,140)}</p>}
      {!!readMore && comment.text.length > 140 && <p>{comment.text}</p>}
      {comment.text.length > 140 && 
        <button className={styles.readMoreButton} onClick={handleReadMore}>{!readMore && 'Read more'}{!!readMore && 'Less'}</button>
      }
      <button className={styles.replyButton} onClick={handleReply}>{!replyClicked && 'Reply'}{!!replyClicked && 'Cancel'}</button>
      {!!replyClicked && <CommentForm subjectType={subjectType} subjectId={(subjectId).toString()} colType='comments' colId={(comment.uid).toString()}/>}
      {!!comments && comments.length > 0 && comments.map((comment, index) => <CommentList key={index} subjectType='comment' subjectId={comment.uid} comments={comments}/>)}
    </div>
  )
}

export default CommentListItem
