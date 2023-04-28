import { useState, useEffect } from "react";
import { getDefinition } from "../services/dictionary-api";

export default function Form() {
  const [formData, setFormData] = useState({ word: "" }); //
  const [word, setWord] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, word: event.target.value }); //...formData is a spread operator
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const wordDef = await getDefinition(formData);
      setWord(wordDef[0]); //
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const wordDef = await getDefinition({ word: "" }); //

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
          className="searchbar"
          type="text"
          name="input"
          onChange={handleChange}
          value={formData.word}
          placeholder="Please enter a word"
        />
        <input type="submit" value="submit" className="sub-btn" />
      </form>
      {word ? (
        <div>
          <h3>Word</h3>
          <p>{word.word}</p>

          {word.phonetics[1] ? (
            <div>
              <p>{word.phonetics[1].text}</p>
              <audio
                className="audio"
                controls
                src={word.phonetics[1].audio}
              ></audio>
            </div>
          ) : null}

          <p>{word.meanings[0].partOfSpeech}</p>

          <h3>The definition of {formData.word} is:</h3>
          {word.meanings[0].definitions.map((definition, index) => (
            <p key={index}>{definition.definition}</p>
          ))}

          {word.meanings[0] ? (
            <div>
              <h3>Example</h3>
              {word.meanings[0].definitions.map((definition, index) => (
                <p key={index}>{definition.example}</p>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
