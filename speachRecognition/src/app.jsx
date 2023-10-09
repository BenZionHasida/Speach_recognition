import React, { useState } from "react";
import 'regenerator-runtime'


import './app.css'
import Record from './recocrd'
import Selectors from './selectors'
import Compare from "./Compare";

export function App() {
  let [router, setRouter] = useState('Selectors')
  let [originalString, setOriginalString] = useState('')
  let [recordedString, setRecordedString] = useState('')

  let handleUserChoice = (originalString)=>{
    setOriginalString(originalString)
    setRouter('Record')
  }

  let handleUserRecording = (recordrdString)=>{
    setRecordedString(recordrdString)
    setRouter('Compare')
  }

  let backToSelectors = ()=>{
    setRouter('Selectors')
  }
  let backToRecord = ()=>{
    setRouter('Record')
  }
  let recordNextMishna = ()=>{
    
  }


  return (
    <div> 
    {router === 'Selectors' && <Selectors sendOriginalString={handleUserChoice}/>}
    {router === 'Record' && <Record sendRecordedString={handleUserRecording} />}
    {router === 'Compare' && <Compare newMishna={backToSelectors} originalString={originalString} recordedString={recordedString} testAgain={backToRecord} nextMishna={recordNextMishna}/>}
     </div>
  )
}

