import React from "react";

const DefinitionAudio = ({ audioSrc }) => {
  if (!audioSrc) return null;
  return <audio className="audio" controls src={audioSrc}></audio>;
};

export default DefinitionAudio;
