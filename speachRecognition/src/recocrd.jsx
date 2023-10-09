import React, { useState } from "react";
import axios from "axios";
import SpeechRecognition, {useSpeechRecognition,} from "react-speech-recognition";

function Record(props) {
  const {
    transcript,
    listening,
    resetTranscript,
  } = useSpeechRecognition();

  function startToRecord(){
    SpeechRecognition.startListening({continuous:true,language:'he-IL'})
  }

  function stopToRecord(){
    // resetTranscript()
    SpeechRecognition.stopListening()
    props.sendRecordedString(transcript)
  }

  return (
    <div>
      <p>שימו לב! יש לומר את המילים בקול רם וברור, מילה אחרי מילה</p>
      <button onClick={stopToRecord}>סיים  הקלטת משנה</button>
      <button onClick={startToRecord}>התחל הקלטת משנה</button>

      {listening && <p>...מאזין</p>}
    </div>
  );
}

export default Record;

