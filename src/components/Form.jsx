import { useState, useEffect } from "react";
import { getDefinition } from "../services/dictionary-api";
{
  /* <FontAwesomeIcon icon={faMagnifyingGlass} />; */
}

export default function Form() {
  const [formData, setFormData] = useState({ word: "" }); // the object formData stores info about a word. defined by a key of 'word' and a empty string value
  const [word, setWord] = useState(null); // word is

  const handleChange = (event) => {
    setFormData({ ...formData, word: event.target.value }); //stores the value of the input and updates user input in real-time
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const wordDefinition = await getDefinition(formData);
      setWord(wordDefinition[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const wordDefinition = await getDefinition({ word: "Hello" });
        setWord(wordDefinition[0]);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []); //dependency array. runs once

  return (
    <div>
      <h1 className="mainh1">The Simple Dictionary</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="searchbar"
          type="text"
          name="input"
          onChange={handleChange}
          value={formData.word}
          placeholder="Search for a word"
        />
        <input type="submit" value="search" className="search-btn" />
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

          <h3>
            The definition of <span className="word-span">{formData.word}</span> is:
          </h3>
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
