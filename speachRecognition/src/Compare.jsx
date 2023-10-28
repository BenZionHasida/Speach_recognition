import React, {useState, PureComponent } from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import stringSimilary from 'string-similarity'
 

function Compare(props){
    // states for original string and scoers of compare strings
    let [originalString, setOriginalString] = useState('')
    let [scoreOfMatch, setScoreOfMatch] = useState(0)
    setOriginalString(props.originalString.replace(/[\u0591-\u05C7,:\.]/g, ''))
    setScoreOfMatch(Math.floor(stringSimilary.compareTwoStrings(originalString,props.recordedString)* 100))
    
    // functions for nav buttons
    function newMishna(){
        props.newMishna()
    }

    function testAgain(){
        props.testAgain()
    }
    function nextMishna(){
        props.nextMishna()
    }
    function nextPerek(){
        props.nextPerek()
    }

   
    return(
        <div className='container compare-container'>
            <h4 className='struc'>בצד שמאל מוצגת המשנה ובצד ימין מוצגת המשנה כפי שהוקלטת, ההבדלים ביניהם מודגשים.<br />בחלק התחתון מוצג הציון שלך 
            <h6>שימו לב! הציון מוטה ללמטה בעקבות טעויות בתהליך המרת ההקלטה לטקסט בעקבות זה ציון מעל 70 הוא בדרך כלל ציון טוב</h6>
            </h4>
        <ReactDiffViewer newValue={originalString} oldValue={props.recordedString} compareMethod={DiffMethod.WORDS} rightTitle={"המשנה"} leftTitle={"ההקלטה שלך"} splitView={true}/>
        <h2 className='score'>הציון שהבוייחען נתן לך הוא {scoreOfMatch + '%'}</h2>
        <div className='compare-buttons end-buttons'>
        <button className='nav-button' onClick={nextMishna}>משנה הבאה</button>
        <button className='nav-button' onClick={nextPerek}>פרק הבא</button>
        <button className='nav-button' onClick={testAgain}>הבחן שוב על אותו משנה</button>
        <button className='nav-button' onClick={newMishna}>משנה חדשה </button>
        </div>

        </div>
    )
}

export default Compare
