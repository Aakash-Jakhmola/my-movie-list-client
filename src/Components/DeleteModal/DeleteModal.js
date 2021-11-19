import React from 'react'
import './DeleteModal.scss'

export default function DeleteModal(props) {
  return (
    <div className='delete-modal-overlay'>
      <div className='delete-modal'>
        {props.message}
        <br/>
        <button className='button-highlighted' 
          onClick={()=>{props.deleteMovie();props.setDeleteModalOpen(false)}}>Yes</button>
        <button  onClick={()=>{;props.setDeleteModalOpen(false)}}>No</button>
      </div>
    </div>
  )
}
