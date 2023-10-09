import React, { useState, useEffect } from "react";
import SederSelector from "./Seder";
import PerekSelector from "./perek";
import MasechetSelector from "./Masechet";
import MishnahSelector from "./mishna";

function Selectors(props) {
  let [router, setRouter] = useState('seder')

  // seder variables and function
    let [choosenSeder, setChoosenSeder] = useState('')
    let handleSederClick = (seder)=>{
        setChoosenSeder(seder)
        setRouter('masecet')
    }
    // masecet variables and functions
    let [choosenMasecet, setchoosenMasecet] = useState('')
    let [masecetDetailes, setMasecetDetailes] = useState('')
    let handleMasecetClick = (masecet, masecetDetailes)=>{
        setchoosenMasecet(masecet)
        setMasecetDetailes(masecetDetailes)
        setRouter('perek')
    }
    // perek varables and functions
    let [choosenPerek, setchoosenPerek] = useState('')
    let handlePerekClick = (Perek)=>{
      Perek = Number(Perek) + 1
        setchoosenPerek(Perek)
        setRouter('mishna')
    }
    // Mishna variables and functions
    let [MishnahIsDisabled, setMishnahIsDisabled] = useState(true)
    let handleMishnaClick = (mishna)=>{
      props.sendOriginalString(mishna)
    }
    function backLevel(){
      if(router === 'masecet'){
        setRouter('seder')
      }
      else if(router === 'perek'){
        setRouter('masecet')
      }
      else if(router === 'mishna'){
        setRouter('perek')
      }
    }


  return (
    <>
    {router === 'seder' && <SederSelector sendSeder={handleSederClick} />}
    {router === 'masecet' && <MasechetSelector sendMasecet={handleMasecetClick}  seder={choosenSeder} />}
    {router === 'perek' && <PerekSelector sendPerek={handlePerekClick}  masecet={choosenMasecet} masecetDetailes={masecetDetailes} />}
    {router === 'mishna' && <MishnahSelector sendMishna={handleMishnaClick}  perekDetailes={masecetDetailes + '.' + choosenPerek}/>}
    <button onClick={backLevel}>חזור</button>
    </>
  )
}

export default Selectors;
