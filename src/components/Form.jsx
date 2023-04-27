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
        const wordDef = await getDefinition({ word: "Hello" });

        setWord(wordDef[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []); //dependency array is empty so it only runs once

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
          <p>{word.phonetics[0].text}</p>
          <audio controls src={word.phonetics[0].audio}></audio>
          <h3>Part of Speech</h3>
          <p>{word.meanings[0].partOfSpeech}</p>
          <h3>Definition</h3>
          {word.meanings[0].definitions.map((definition, index) => (
            <p key={index}>{definition.definition}</p>
          ))}
        
          <h3>Examples</h3>
          {word.meanings[0].definitions.map((definition, index) => (
            <p key={index}>{definition.example}</p>
          ))}
        </div>
      ) : null}
    </div>
  );

}
