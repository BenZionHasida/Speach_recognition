import react, { useState, useEffect } from "react";
import axios from "axios";

function SederSelector(props) {
  // state for list of sedarim
  let [sederArray, setSederArray] = useState([]);
  // fetch the sedarim from 'safria' api
  useEffect(() => {
    async function fetchSeder() {
      let response = await axios.get("https://www.sefaria.org/api/index/");
      let data = response.data;
      let box = [];
      for (let index = 0; index < 6; index++) {
        box.push(data[1].contents[index].heCategory);
      }
      setSederArray(box);
    }
    fetchSeder();
  }, []);
  // handle user select (route to next select)
  function handleChange(event) {
    props.sendSeder(event.target.value);
  }

  return (
    <div className="selector">
      {sederArray.map((item, index) => (
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
export default SederSelector;
