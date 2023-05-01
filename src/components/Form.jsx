import { useState, useEffect } from "react";
import { getDefinition } from "../services/dictionary-api";
{
  /* <FontAwesomeIcon icon={faMagnifyingGlass} />; */
}

export default function Form() {
  const [userInput, setUserInput] = useState(""); // the object formData stores info about a definition. defined by a key of 'word' and a empty string value
  const [word, setWord] = useState(""); // word is
  const [definition, setDefinition] = useState(null);

  const handleChange = (event) => {
    setUserInput(event.target.value); //stores the value of the input and updates user input in real-time
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setDefinition(null);
      setWord(userInput);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!word) {
        // if there's no word then stop right here
        return;
      }
      try {
        const wordDefinition = await getDefinition({ word });
        setDefinition(wordDefinition[0]);
      } catch (error) {
        console.error(error);
        setDefinition({ word, error: true });
      }
    }
    fetchData();
  }, [word, setDefinition]); //dependency array. runs once

  return (
    <div>
      <h1 className="mainh1">The Simple Dictionary</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="searchbar"
          type="text"
          name="input"
          onChange={handleChange}
          value={userInput}
          placeholder="Search for a word"
        />
        <input type="submit" value="search" className="search-btn" />
        <p>
          Press search to lookup <span className="word-span">{userInput}</span>
        </p>
      </form>
      {definition && definition.error ? <p>bad</p> : null}
      {definition && !definition.error && userInput === word ? (
        <div>
          {/* <h3>Word</h3> */}
          <p>{definition.word}</p>

          {definition.phonetics[1] ? (
            <div>
              <p>{definition.phonetics[1].text}</p>
              <audio
                className="audio"
                controls
                src={definition.phonetics[1].audio}
              ></audio>
            </div>
          ) : null}

          <p>{definition.meanings[0].partOfSpeech}</p>

          <h4>
            The definition of{" "}
            <span className="word-span">{userInput || word}</span> is:
          </h4>
          {definition.meanings[0].definitions.map((definition, index) => (
            <p key={index}>{definition.definition}</p>
          ))}

          {/* {definition.meanings[0] ? (
            <div>
              <h3>Example</h3>
              {definition.meanings[1].definitions.map((definition, index) => (
                <p key={index}>{definition.example}</p>
              ))}
            </div>
          ) : null} */}
        </div>
      ) : null}
    </div>
  );
}
