import React, { useState, useEffect } from "react";
import axios from "axios";


function MishnahSelector(props){
    let [mishnaArray, setMishnaArray] = useState([])
    let lettersInHebrew = ["א","ב","ג","ד","ה","ו","ז","ח","ט","י",'י"א','י"ב','י"ג','י"ד','ט"ו','ט"ז','י"ז','י"ח','י"ט','כ','כ"א','כ"ב','כ"ג','כ"ד','כ"ה','כ"ו','כ"ז','כ"ח','כ"ט','ל']
    let [currentPerek, setCurrentPerek] = useState({})

    useEffect(()=>{
        async function fetchMishna(){
            let response = await axios.get("https://www.sefaria.org/api/texts/"+props.perekDetailes)
            let data = response.data
            setCurrentPerek(data)
            let box = []
            for (let index = 0; index < data.he.length; index++) {
                box.push(<option id={index} value={index}>{"משנה "+lettersInHebrew[index]}</option>)                
            }
            setMishnaArray(box)
        }
        fetchMishna()
    },[])
    function handleChange(event){
        let index = Number(event.target.value) 
        props.sendMishna(currentPerek.he[index])
    }
    return (
        <>
        <select onChange={handleChange}  name="mishna" id="mishna">
            <option value="">בחר משנה</option>
            {mishnaArray.map((item)=> item)}
        </select>
        </>
    )

}

export default MishnahSelector