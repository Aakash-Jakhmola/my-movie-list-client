import React,{useState,useEffect} from 'react'
import './Notif.scss'

function Notif(props) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    console.log('run')
    setTimeout(() => {
      setVisible(false);
      console.log('expired')
    }, 500000);
  }, []);
  return visible? (
    <div className='notif' style={{backgroundColor:props.color}} onClick={()=>setVisible(false)}>
      <b>{props.type}</b>
      <br/>
      {props.message}
      {/* <div className='progress'></div> */}
    </div>
  ):<></>
}

export default Notif
