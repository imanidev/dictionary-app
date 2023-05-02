import { useState, useEffect } from "react";
import { getDefinition } from "../services/dictionary-api";

export default function Form() {
  const [userInput, setUserInput] = useState(""); //userInput is the value of the input. setUserInput is a function that updates the value of the input
  const [word, setWord] = useState(""); //word is the word that is being searched for. setWord is a function that updates the word that's being searched
  const [definition, setDefinition] = useState(null); //definition is the definition of the word. setDefinition is a function that updates the definition of the word

  const handleChange = (event) => {
    setUserInput(event.target.value); //stores the value of the input and updates user input in real-time
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    try {
      setDefinition(null); //
      setWord(userInput);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      if (!word) {
        // if there's no word then stop right here
        return; //stops the function.
      }
      try {
        // if there is a word then try to get the definition
        const wordDefinition = await getDefinition({ word });
        setDefinition(wordDefinition[0]); //set the definition to the first definition in the array
      } catch (error) {
        console.error(error);
        setDefinition({ word, error: true }); //word (property) is set to the word that was passed in and error is set to true.
      }
    }
    fetchData();
  }, [word, setDefinition]); //dependency array. runs once. backup to the if statement

  return (
    <div>
      <h1 className="mainh1">The Simple Dictionary</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="searchbar"
          type="text"
          name="input"
          onChange={handleChange} //when the input changes, the handleChange function is called
          value={userInput} //the value of the input is set to the value of userInput
          placeholder="Please enter a word"
        />
        <input type="submit" value="search" className="search-btn" />
        <p>
          Press search to look up <span>{userInput}</span>
        </p>
      </form>
      {definition && definition.error ? ( //if there's a definition and there's an error then show the error message
        <p>Word not found. Perhaps you misspelled it?</p>
      ) : null}

      {definition && !definition.error && userInput === word ? (
        <div>
          {/* <p>{definition.word}</p> */}
          <div className="definition-container">
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
          </div>

          <p>{definition.meanings[0].partOfSpeech}</p>

          <h4>
            The definition of <span className="word-span">{userInput}</span> is:
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
