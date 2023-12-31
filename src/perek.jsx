import React, { useState, useEffect } from "react";
import axios from "axios";

function PerekSelector(props) {
  // state for list of perakim
  let [PerekArray, setPerekArray] = useState([]);
  // hebrews letters
  let lettersInHebrew = [
    "א",
    "ב",
    "ג",
    "ד",
    "ה",
    "ו",
    "ז",
    "ח",
    "ט",
    "י",
    'י"א',
    'י"ב',
    'י"ג',
    'י"ד',
    'ט"ו',
    'ט"ז',
    'י"ז',
    'י"ח',
    'י"ט',
    "כ",
    'כ"א',
    'כ"ב',
    'כ"ג',
    'כ"ד',
    'כ"ה',
    'כ"ו',
    'כ"ז',
    'כ"ח',
    'כ"ט',
    "ל",
  ];
  // fetch the perakim from 'sefari' api
  useEffect(() => {
    async function fetchPerek() {
      let response = await axios.get(
        "https://www.sefaria.org/api/texts/" + props.masecetDetailes
      );
      let data = response.data;
      let prakim = data.lengths[0];
      let box = [];
      for (let index = 0; index < prakim; index++) {
        box.push("פרק " + lettersInHebrew[index]);
      }
      setPerekArray(box);
    }
    fetchPerek();
  }, []);
  // convert hebrew letter to number
  function convertHebrewLetterToNumber(hebrewLetter) {
    let asNumber = lettersInHebrew.indexOf(hebrewLetter);
    return asNumber;
  }
  // handle user select (route to next selector)
  function handleChange(event) {
    let perek = convertHebrewLetterToNumber(
      event.target.value[event.target.value.length - 1]
    );
    props.sendPerek(perek);
  }

  return (
    <div className="selector">
      {PerekArray.map((item, index) => (
        <button
          className="option"
          key={index}
          value={item}
          id={index}
          onClick={handleChange}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default PerekSelector;
