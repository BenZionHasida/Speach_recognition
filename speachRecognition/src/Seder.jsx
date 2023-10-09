import react, {useState, useEffect} from 'react'
import axios from 'axios'


function SederSelector(props){
    let [sederArray, setSederArray] = useState([])

    useEffect(()=>{
        async function fetchSeder(){
            let response = await axios.get("https://www.sefaria.org/api/index/")
            let data = response.data
            // console.log(data[1].contents[0].heCategory);
            let box = []
            for (let index = 0; index < 6; index++){
                box.push(data[1].contents[index].heCategory)
            }
            setSederArray(box)
        }
        fetchSeder()

    },[])
    function handleChange(event){
        props.sendSeder(event.target.value)
    }
    

    return (
        <>
        <select onChange={handleChange}  name="seder" id="seder">
            <option value="">בחר סדר</option>
            {sederArray.map((item,index)=>(
                <option value={item} id={index}>{item}</option>
            ))}
        </select>

        </>
    )
}
export default SederSelector