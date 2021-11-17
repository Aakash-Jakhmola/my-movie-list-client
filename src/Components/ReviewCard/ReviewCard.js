import React, {useState} from 'react'
import './ReviewCard.scss'
import ReactStars from "react-rating-stars-component";
import { Link, Route, Switch} from 'react-router-dom';

import MovieDetailsModal from '../MovieDetailsModal/MovieDetailsModal';

function ReviewCard({movie}) {

	const [detailModalOpen, setDetailModalOpen] = useState(false)

	console.log(movie)
  return (
    <>
			<div className='movie-review-card'>
				{/* <Link to={`/movies/${movie.movieid}`} className='link'> */}
				{/* <button> */}
				<img src={movie?.movie_details?.poster_url}/>
				<div className='body'>
				<div className='title'>{movie?.movie_details?.title}</div>
				<div className='review'>
					{movie.review}
					</div>
				</div>
				<div className='stars'>
				<ReactStars
    			count={5}
    			size={18}
					value={movie.score/2}
    			activeColor="#ffd700"	
					isHalf={true}
					edit={false}
  			/>
				</div>
				<div className='update'>
					<i className="far fa-edit"/>
					<i className="far fa-trash-alt"/>
				</div>
				{/* </button> */}
				{/* </Link> */}
    	</div>
			<Switch>
			 <Route
  			exact path="/movies/:id"
  			children={({ match }) => {
					console.log('printing match for:',movie.movie.title,match)
    			return (
						<MovieDetailsModal/>
      			// <Modal onClose={onClose} isOpened={Boolean(match)}>
        		// 	<ImageModalContent id={match && match.params.id} />
      			// </Modal>
    			);
 				}}
			/> 
			</Switch>
			{/* {detailModalOpen && <MovieDetailsModal/>} */}
		</>
  )		
}

export default ReviewCard
