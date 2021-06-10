import React from 'react'
import styles from './CommentListItem.module.scss';

const CommentListItem = ({comment}) => {
  console.log(comment)
  return (
    <div className={styles.CommentListItem}>
      <h3 className={styles.commentTitle}>{comment.title}</h3>
      <p>Posted on: {comment.createdAt}</p>
      <p>{comment.text}</p>
    </div>
  )
}

export default CommentListItem
