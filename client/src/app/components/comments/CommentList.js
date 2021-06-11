import React from 'react';
import styles from './CommentList.module.scss';
import CommentForm from './CommentForm';
import CommentListItem from './CommentListItem';

const CommentList = ({comments, subjectType, subjectId, amount = null}) => {
  if (!!comments && !!amount) comments.length = amount;
  return (
    <div>
      <ul className={styles.commentList}>
        {comments && comments.map((comment, index) => <CommentListItem key={index} comment={comment} subjectId={subjectId} subjectType={subjectType}/>)}
      </ul>
    </div>
  )
}

export default CommentList
