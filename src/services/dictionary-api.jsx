// Purpose: to fetch data from the dictionary api

import axios from "axios";

export async function getDefinition(formData) { 
  try {
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${formData.word}`
    );
    const data = response.data; //data is an array of objects with the word and other info about it. 
    return data;
  } catch (error) {
    console.error(error);
  }
}
//axios automatically parses the data into json format
