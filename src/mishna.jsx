import React, { useState, useEffect } from "react";
import axios from "axios";


function MishnahSelector(props){
    // state for list of mishnayot
    let [mishnaArray, setMishnaArray] = useState([])
    // hebrews letters
    let lettersInHebrew = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י",'י"א','י"ב','י"ג','י"ד','ט"ו','ט"ז','י"ז','י"ח','י"ט','כ','כ"א','כ"ב','כ"ג','כ"ד','כ"ה','כ"ו','כ"ז','כ"ח','כ"ט','ל']
    let [currentPerek, setCurrentPerek] = useState({})
    let [lengths, setLengths] = useState([])
    // fetch the mishna from 'sefaria' api
    useEffect(()=>{
        async function fetchMishna(){
            let response = await axios.get("https://www.sefaria.org/api/texts/"+props.perekDetailes)
            let data = response.data
            setCurrentPerek(data)
            setLengths([data.lengths[0],data.he.length])
            let box = []
            for (let index = 0; index < data.he.length; index++) {
                box.push("משנה "+lettersInHebrew[index])                
            }
            setMishnaArray(box)
        }
        fetchMishna()
    },[])
    // handle mishna choice (route to the record component)
    function handleChange(event){
        let index = Number(event.target.value) 
        props.sendMishna([currentPerek.he[index],[props.perekDetailes,index + 1, ...lengths]])
    }
    return (
        <div className="selector">
        {mishnaArray.map((item, index)=> (
        <button className="option" key={index} onClick={handleChange} id={index} value={index}>{item}</button>))}

        </div>
    )

}

export default MishnahSelector