import React from 'react'
import Loader from '../Loader/Loader'

import './PageLoader.scss'

function PageLoader() {
  return (
    <div className='page-loader-overlay'>
       <Loader size='10' center={true}/>
    </div>
  )
}

export default PageLoader
