import React from 'react'
import styles from './CommentForm.module.scss';

const CommentForm = ({subjectType, subjectId}) => {
  return (
    <form className={styles.CommentForm}>
      <label htmlFor="commentText">Message:</label>
      <textarea name="commentText" placeholder='Leave a comment...'></textarea>
      <input type="submit" value="Submit"/>
    </form>
  )
}

export default CommentForm
