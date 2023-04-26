import { useState } from "react";
import { getDefinition } from "../services/dictionary-api";

export default function Form() {
  const [formData, setFormData] = useState({ word: "" });
  const [definition, setDefinition] = useState("");
  const [word, setWord] = useState("");
  const [meaning, setMeaning] = useState("");

  const handleChange = (event) => {
    setFormData({ ...formData, word: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const wordDef = await getDefinition(formData);
      setDefinition(wordDef[0].word); //
      setWord(formData.word);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="searchterm"
          onChange={handleChange}
          value={formData.word}
          placeholder="Enter a word"
        />
        <input type="submit" value="submit" />
      </form>
      {definition && (
        <div>
          <h3>Word:</h3>
          <p>{word}</p>
          <h3>Definition:</h3>
          <p>{definition}</p>
          <p>{meaning}</p>
        </div>
      )}
    </div>
  );
}
