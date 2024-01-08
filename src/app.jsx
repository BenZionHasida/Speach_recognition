import React, { useState, useEffect } from "react";
import "regenerator-runtime";
import axios from "axios";

import "./app.css";
import Record from "./recocrd";
import Selectors from "./selectors";
import Compare from "./Compare";
import HomePage from "./HomePage";
import { async } from "regenerator-runtime";

export function App() {
  // route component to render
  let [router, setRouter] = useState("HomePage");
  // the data about current mishna the user test on
  let [currentMishnaData, setCurrentMishnaData] = useState([]);
  // states to original and recorded text (mishna)
  let [originalString, setOriginalString] = useState("");
  let [recordedString, setRecordedString] = useState("");
  // handle user mishnah choice (take the mishna string from 'selectors' component)
  let handleUserChoice = (originalString) => {
    setOriginalString(originalString[0]);
    setCurrentMishnaData(originalString[1]);
    setRouter("Record");
  };
  // handle user record (take the user record string from 'record' component)
  let handleUserRecord = (recordrdString) => {
    setRecordedString(recordrdString);
    setRouter("Compare");
  };

  // if  user wants to test on new mishna after he finished one, the function route back 'selectors' component
  let backToSelectors = () => {
    setRouter("Selectors");
  };
  // if  user wants to retest on the current mishna, the function route to 'record' component again
  let backToRecord = () => {
    setRouter("Record");
  };
  // if user wants to test on next mishna, fetch the mishna and route to 'record' component
  let recordNextMishna = () => {
    if (currentMishnaData[1] + 1 <= currentMishnaData[3]) {
      async function fetchNextMishna() {
        let response = await axios.get(
          "https://www.sefaria.org/api/texts/" + currentMishnaData[0]
        );
        let data = response.data;
        let nextMishna = data.he[currentMishnaData[1]];
        setOriginalString(nextMishna);
        setRouter("Record");
        let newData = currentMishnaData;
        newData[1] += 1;
        setCurrentMishnaData(newData);
      }
      fetchNextMishna();
    } else {
      alert("אין עוד משניות בפרק הזה, אפשר לעבור לפרק הבא");
    }
  };
  // if user wants to test on next perek, fetch the next perek and route to 'record' component
  let recordNextPerek = () => {
    let perekAsNumber = Number(
      currentMishnaData[0][currentMishnaData[0].length - 1]
    );
    let pathOfFetch = currentMishnaData[0].slice(0, -1);
    if (perekAsNumber + 1 <= currentMishnaData[2]) {
      async function fetchNextPerek() {
        let response = await axios.get(
          "https://www.sefaria.org/api/texts/" +
            pathOfFetch +
            (perekAsNumber + 1)
        );
        let data = response.data;
        setOriginalString(data.he[0]);
        setRouter("Record");
        let newData = [
          pathOfFetch + (perekAsNumber + 1),
          1,
          currentMishnaData[2],
          data.he.length,
        ];
        setCurrentMishnaData(newData);
      }
      fetchNextPerek();
    } else {
      alert("אין עוד פרקים במסכת הזו, בחר משנה במסכת אחרת");
    }
  };
  let startToTest = () => {
    setRouter("Selectors");
  };
  return (
    <div>
      {router === "HomePage" && <HomePage startToTest={startToTest} />}
      {router === "Selectors" && (
        <Selectors sendOriginalString={handleUserChoice} />
      )}
      {router === "Record" && <Record sendRecordedString={handleUserRecord} />}
      {router === "Compare" && (
        <Compare
          newMishna={backToSelectors}
          originalString={originalString}
          recordedString={recordedString}
          testAgain={backToRecord}
          nextMishna={recordNextMishna}
          nextPerek={recordNextPerek}
        />
      )}
    </div>
  );
}
