import React, { useState, useEffect } from "react";
import SederSelector from "./Seder";
import PerekSelector from "./perek";
import MasechetSelector from "./Masechet";
import MishnahSelector from "./mishna";

function Selectors(props) {
  // route components to render
  let [router, setRouter] = useState("seder");

  // state for sedorim array (to create the option elements) and function to handle user seder choice
  let [choosenSeder, setChoosenSeder] = useState("");
  let handleSederClick = (seder) => {
    setChoosenSeder(seder);
    setRouter("masecet");
  };
  // states for masectot array (to create the option elements) and masecet detailes (for send to perek components) and function to handle user masecet choice
  let [choosenMasecet, setchoosenMasecet] = useState("");
  let [masecetDetailes, setMasecetDetailes] = useState("");
  let handleMasecetClick = (masecet, masecetDetailes) => {
    setchoosenMasecet(masecet);
    setMasecetDetailes(masecetDetailes);
    setRouter("perek");
  };

  // state for perakim array (to create the option elements) and function to handle user perek choice
  let [choosenPerek, setchoosenPerek] = useState("");
  let handlePerekClick = (Perek) => {
    Perek = Number(Perek) + 1;
    setchoosenPerek(Perek);
    setRouter("mishna");
  };
  // state for mishnayot array (to create the option elements) and function to handle user mishna choice
  let handleMishnaClick = (mishna) => {
    props.sendOriginalString(mishna);
  };

  // reroute in case the user wants go back 1 level
  function backLevel() {
    if (router === "masecet") {
      setRouter("seder");
    } else if (router === "perek") {
      setRouter("masecet");
    } else if (router === "mishna") {
      setRouter("perek");
    }
  }

  return (
    <div className="container">
      <h4 className="struc">
        בחרו את המשנה עליה תרצו להיבחן לפי: סדר, מסכת, פרק, משנה
      </h4>
      {router === "seder" && <SederSelector sendSeder={handleSederClick} />}
      {router === "masecet" && (
        <MasechetSelector
          sendMasecet={handleMasecetClick}
          seder={choosenSeder}
        />
      )}
      {router === "perek" && (
        <PerekSelector
          sendPerek={handlePerekClick}
          masecet={choosenMasecet}
          masecetDetailes={masecetDetailes}
        />
      )}
      {router === "mishna" && (
        <MishnahSelector
          sendMishna={handleMishnaClick}
          perekDetailes={masecetDetailes + "." + choosenPerek}
        />
      )}
      <button className="nav-button end-buttons" onClick={backLevel}>
        חזור
      </button>
    </div>
  );
}

export default Selectors;
