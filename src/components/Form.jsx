import { useState, useEffect } from "react";
import { getDefinition } from "../services/dictionary-api";
import InputForm from "./InputForm";
import DefinitionDisplay from "./DefinitionDisplay";

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

  function returnWordNotFound() {
    return (
      <p className="error-text">Word not found. Perhaps you misspelled it?</p>
    );
  }

  return (
    <div>
      <h1 className="mainh1">The Simple Dictionary</h1>

      {/* Made input form its own component for easier modification */}
      <InputForm
        onSubmit={handleSubmit}
        onInputChange={handleChange}
        userInput={userInput}
      />

      {/* 
          You can choose to only show the "Word not found" 
          text only if both conditions are true. 
      
          In other words, you don't have to do a 
          ternary operator that shows null 

          I put your error in a function that will return the p tag
          if the word isn't found.
      */}

      {definition && definition.error && returnWordNotFound()}

      {/* {definition && !definition.error && userInput === word ? (
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
      ) : null} */}

      <DefinitionDisplay
        definition={definition}
        userInput={userInput}
        word={word}
      />
    </div>
  );
}
