import React, { useState } from "react";
import axios from "axios";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

function Record(props) {
  // states for react-speach-recognition
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  // start to record function
  function startToRecord() {
    SpeechRecognition.startListening({ continuous: true, language: "he-IL" });
  }
  // stop to record function
  function stopToRecord() {
    SpeechRecognition.stopListening();
    props.sendRecordedString(transcript);
  }

  return (
    <div className="container record-container">
      <h4 className="struc record-struc">
        שימו לב! יש לומר את המילים בקול רם וברור, מילה אחרי מילה
      </h4>

      {!listening && <h4>להתחלת הבחינה לחץ על הכפתור למטה</h4>}
      {listening && <h2>הבוייחען מאזין לך! </h2>}
      {listening && <span className="recording-indicator"></span>}
      <div className="record-buttons">
        <button className="nav-button" onClick={startToRecord}>
          התחל הקלטה
        </button>

        <button className="nav-button" onClick={stopToRecord}>
          סיים הקלטה
        </button>
      </div>
    </div>
  );
}

export default Record;
