import react, {useEffect,useState} from 'react'
import axios from 'axios'


function MasechetSelector(props){
    let [MasecetArray, setMasecetArray] = useState([])
    let [dictionaryOfNames, setDictionaryOfNames] = useState({})
    useEffect(()=>{
        async function fetchMasecet(){
            let response = await axios.get("https://www.sefaria.org/api/index/")
            let data = response.data
            for (let index = 0; index < 6; index++){
                if (data[1].contents[index].heCategory ===  props.seder){
                    let boxOfNames = []
                    let boxDictionaryOfNames = {}
                    for(let index1 = 0; index1 < data[1].contents[index].contents.length-1; index1++){
                        let heTitle = data[1].contents[index].contents[index1].heTitle.replace('משנה','מסכת')
                        boxOfNames.push(heTitle)
                        boxDictionaryOfNames[heTitle] = data[1].contents[index].contents[index1].title
                    }
                    setMasecetArray(boxOfNames)
                    setDictionaryOfNames(boxDictionaryOfNames)
                }
            }
        }
        fetchMasecet()

    },[])
    function handleChange(event){
        props.sendMasecet(event.target.value, dictionaryOfNames[event.target.value])        
    }
    

    return (
        <>
        
        <select onChange={handleChange}  name="Masecet" id="Masecet">
            <option value="">בחר מסכת</option>
            {MasecetArray.map((item,index)=>(
                <option value={item} id={index}>{item}</option>
            ))}
        </select>
        {/* <label htmlFor=""> בחר מסכת</label> */}

        </>
    )

}

export default MasechetSelector