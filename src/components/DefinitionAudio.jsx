import React from "react";

const DefinitionAudio = ({ audioSrc }) => {
  return <audio className="audio" controls src={audioSrc}></audio>;
};

export default DefinitionAudio;
