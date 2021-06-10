import React from 'react';
import styles from './CommentList.module.scss';
import CommentForm from './CommentForm';
import CommentListItem from './CommentListItem';

const CommentList = ({comments, subjectType, subjectId}) => {
  return (
    <div>
      <CommentForm subjectId={subjectId} subjectType={subjectType}/>
      <ul className={styles.commentList}>
        {comments && comments.map(comment => <CommentListItem key={comment.id} comment={comment} />)}
      </ul>
    </div>
  )
}

export default CommentList
