import { useState, useEffect } from "react";
import "./App.css";
import { getDefinition } from "./services/dictionary-api";
import Form from "./components/Form";

function App() {
  
  const [definition, getDefinition] = useState('')
  

  
  
  return (
    <div>
      <Form />
    </div>
  )
}

export default App;
