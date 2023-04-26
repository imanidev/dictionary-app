import { useState, useEffect } from "react";
import { getDefinition } from "../services/dictionary-api";

export default function Form() {
  const [formData, setFormData] = useState({ word: "" });
  const [word, setWord] = useState(null);


  const handleChange = (event) => {
    setFormData({ ...formData, word: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const wordDef = await getDefinition(formData);
    
      setWord(wordDef[0]);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => { 
    async function fetchData() {
       try {
      const wordDef = await getDefinition({word: 'Hello'});
    
      setWord(wordDef[0]);
    } catch (error) {
      console.log(error);
    }
    }
    fetchData()
  }, [])
  
// console.log(word.meanings[0].definitions[0].definition)
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="input"
          onChange={handleChange}
          value={formData.word}
          placeholder="Please enter a word"
        />
        <input type="submit" value="submit" />
      </form>
      {word ? (
        <div>
          <h3>Word:</h3>
          <p>{word.word}</p>
          <h3>Definition</h3>
          <p>{word.meanings[0].definitions[0].definition}</p>
          {/* <p>{meaning}</p> */}
          {/* <p>{phonetic}</p>  */}
        </div>
      ) : null}
    </div>
  );
}
