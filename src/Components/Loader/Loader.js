import React from 'react'
import './Loader.scss'

function Loader(props) {
  let style = 
  {
    fontSize:`${props.size?props.size:'5'}px`,
    position:`relative`,
    margin: '0 auto',
    top: `${props.center?'50%':'0'}`,
    transform: `${props.center?'translateY(-50%)':''}`,
  };
  return (
    <div className='loader' 
      style={style}>Loading
    </div>
  )
}

export default Loader
