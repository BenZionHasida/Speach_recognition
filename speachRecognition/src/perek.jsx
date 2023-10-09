import React, { useState, useEffect } from "react";
import axios from "axios";

function PerekSelector(props){
    let [PerekArray, setPerekArray] = useState([])
    let lettersInHebrew = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י",'י"א','י"ב','י"ג','י"ד','ט"ו','ט"ז','י"ז','י"ח','י"ט','כ','כ"א','כ"ב','כ"ג','כ"ד','כ"ה','כ"ו','כ"ז','כ"ח','כ"ט','ל']

    useEffect(()=>{
        async function fetchPerek(){
            let response = await axios.get("https://www.sefaria.org/api/texts/"+props.masecetDetailes)
            let data = response.data
            let prakim = data.lengths[0]
            let box = []
            for (let index=0; index < prakim; index++){
                box.push('פרק '+lettersInHebrew[index])
            }
            setPerekArray(box)
            
        }
        fetchPerek()

    },[])
    function handleChange(event){
        props.sendPerek(event.target.value)
      }
    

    return (
        <>
        <select onChange={handleChange}  name="Perek" id="Perek">
            <option value="">בחר פרק</option>
            {PerekArray.map((item,index)=>(
                <option value={index} id={index}>{item}</option>
            ))}
        </select>
        {/* <label htmlFor=""> בחר פרק</label> */}

        </>
    )

}

export default PerekSelector