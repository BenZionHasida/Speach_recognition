import React, { useState } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";


function Record(props) {
  const [state, setState] = useState('idle');

  const onClickHandler = () => {
    setState('loading');

    // send an HTTP request
    setTimeout(() => {
      setState('success');
    }, 2000);
  };
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  function startToRecord() {
    SpeechRecognition.startListening({ continuous: true, language: "he-IL" });
  }

  function stopToRecord() {
    // resetTranscript()
    SpeechRecognition.stopListening();
    props.sendRecordedString(transcript);
  }

  return (
    <div className="container record-container">
      <h4 className="struc record-struc">שימו לב! יש לומר את המילים בקול רם וברור, מילה אחרי מילה</h4>
      
      <div className="record-buttons">
        <button className="nav-button" onClick={startToRecord}>
          התחל הקלטת משנה
        </button>

        <button className="nav-button" onClick={stopToRecord}>
          סיים הקלטת משנה
        </button>
        </div>
        {listening && <span className="recording-indicator"></span>} 
      
    </div>
  );
}

export default Record;
