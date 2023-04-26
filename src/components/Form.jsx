import { useState } from "react";
import { getDefinition } from "../services/dictionary-api";
//Define a function that is our component, always make sure to declare the props parameter so you can use props in your component
export default function Form() {
  //State to hold the data of our form
  const [formData, setFormData] = useState({
    searchterm: "",
  });

  //handleChange - updates formData when we type into form
  const handleChange = (event) => {
    //use the event object to detect key and value to update
    setFormData(event.target.value);
  };

  const handleSubmit = async (event) => {
    //prevent page from refreshing on form submission
    event.preventDefault();
    const wordDef = await getDefinition(formData);
    console.log(event.target)
    formData.searchterm;
    console.log(wordDef[0].meaning);
  };

  //The component must return some JSX

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchterm"
          onChange={handleChange}
          value={formData.searchterm}
        />
        <input type="submit" value="submit" />
      </form>
    </div>
  );
}
