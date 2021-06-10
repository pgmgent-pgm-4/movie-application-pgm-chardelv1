import React from 'react'
import styles from './CommentListItem.module.scss';

const CommentListItem = ({comment}) => {
  return (
    <div className={styles.CommentListItem}>
      <p>Posted on: {comment.createdAt}</p>
      <p>{comment.text}</p>
    </div>
  )
}

export default CommentListItem
