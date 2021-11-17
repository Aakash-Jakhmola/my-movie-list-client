import React from 'react'
import './RatingModal.scss'
import Loader from '../Loader/Loader';

import ReactStars from 'react-rating-stars-component';
import { FormGroup,Container, Row, Col, Input } from 'reactstrap';

function RatingModal({setRatingModalOpen,rating,setRating,review,setReview,submitReview,ratingError}) {
  function stopPropagation(e) {
    e.stopPropagation();
  }

  const ratingChanged = (newRating) => {
    newRating*=2
    console.log(newRating);
    setRating(newRating)
  };  

  return (
    <div className='rating-modal-overlay' onClick={()=>{setRatingModalOpen(false)}}>
      <div className='rating-modal' onClick={stopPropagation}> 
        <div className='header'>Your Opinion Matters</div>
        <div className='content'>
        <Container>
          <Row>
          <div className='stars'>
            How was the movie?
            <ReactStars
    		      count={5}
    		      size={30}
				      value={rating}
              onChange={ratingChanged}
    		      activeColor="#ffd700"
				      isHalf={true}
				      edit={true}
  		      />
          </div>
          </Row>
          <Row>
            <Col md="12">
              <FormGroup>
                <Input 
                  type="textarea" 
                  name="text" 
                  placeholder='Leave a review'
                  value={review}
                  onChange={(e)=>setReview(e.target.value)} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
              <Col md="12">
                <FormGroup>
                {<button onClick={submitReview}> Rate Now </button>}
                </FormGroup>
              </Col>
          </Row>
          <Row>
            <Col className='error-resp'>{ratingError}</Col>
          </Row>
        </Container>
        </div>
      </div>
    </div>
  )
}

export default RatingModal
