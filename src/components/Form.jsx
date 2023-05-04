import { useState, useEffect } from "react";
import { getDefinition } from "../services/dictionary-api";

export default function Form() {
  const [userInput, setUserInput] = useState("");
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState(null);

  const handleChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setDefinition(null);
    setWord(userInput);
  };

  useEffect(() => {
    async function fetchData() {
      if (!word) {
        return; //stops the function
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
  }, [word, setDefinition]);

  return (
    <div>
      <h1 className="mainh1">The Simple Dictionary</h1>
      <form onSubmit={handleSubmit}>
        <div className="search-container">
          <div>
            <input
              className="searchbar"
              type="text"
              name="input"
              onChange={handleChange}
              value={userInput}
              placeholder="Please enter a word"
            />
          </div>
          <div>
            <input type="submit" value="search" className="search-btn" />
          </div>
        </div>
        <p className="main-p">Press search to look up {userInput}</p>
      </form>
      {definition && definition.error ? (
        <p className="error-text">Word not found. Perhaps you misspelled it?</p>
      ) : null}

      {definition && !definition.error && userInput === word ? (
        <div>
          {definition.phonetics[1] ? (
            <div>
              <p>{definition.phonetics[0].text}</p>
              <audio
                className="audio"
                controls
                src={definition.phonetics[1].audio}
              ></audio>
            </div>
          ) : null}
          <h4>
            The definition of <span>{userInput}</span> is:
          </h4>
          {definition.meanings[0].definitions.map((definition, index) => (
            <p key={index}>{definition.definition}</p>
          ))}
        </div>
      ) : null}
    </div>
  );
}
