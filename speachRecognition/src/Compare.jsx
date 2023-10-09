import React, {useState, PureComponent } from 'react'
import ReactDiffViewer, { DiffMethod } from 'react-diff-viewer';
import stringSimilary from 'string-similarity'
 

function Compare(props){
    let [originalString, setOriginalString] = useState('')
    let [scoreOfMatch, setScoreOfMatch] = useState(0)
    setOriginalString(props.originalString.replace(/[\u0591-\u05C7,:\.]/g, ''))
    setScoreOfMatch(Math.floor(stringSimilary.compareTwoStrings(originalString,props.recordedString)* 100))
    

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
        <>
        <ReactDiffViewer newValue={originalString} oldValue={props.recordedString} compareMethod={DiffMethod.WORDS} rightTitle={"המשנה"} leftTitle={"ההקלטה שלך"} splitView={true} styles={{line:{direction: 'rtl'}}} />
        <p>שימו לב! הציון מוטה ללמטה בעקבות טעויות בתהליך המרת ההקלטה לטקסט בעקבות זה ציון מעל 75 הוא בדרך כלל ציון טוב</p>
        <p>הציון שלך הוא {scoreOfMatch}</p>
        <button onClick={newMishna}>בחר משנה חדשה </button>
        <button onClick={testAgain}>הבחן שוב על אותו משנה</button>
        <button onClick={nextPerek}>עבור לפרק הבא</button>
        <button onClick={nextMishna}>עבור למשנה הבאה</button>


        </>
    )
}

export default Compare
