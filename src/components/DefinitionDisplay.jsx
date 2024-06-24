import DefinitionAudio from "./DefinitionAudio";
import MeaningGrid from "./MeaningGrid";
import "../css/definition.css";

const DefinitionDisplay = ({ definition, userInput, word }) => {
  if (!definition || definition.error || userInput !== word) {
    return null;
  }

  const phonetics = definition.phonetics;
  const meanings = definition.meanings;

  return (
    <div className="definition">
      {/* Phonetic spelling and audio is available */}
      {phonetics && (
        <div className="definition__audio">
          <p>{phonetics[0].text}</p>

          {/* Phonetics audio player */}
          <DefinitionAudio audioSrc={phonetics[1].audio} />
        </div>
      )}
      <br />

      <h4 className="definition__header">
        The definition(s) of{" "}
        <span className="definition__user-input">{userInput}</span>:
      </h4>

      <br />

      <MeaningGrid meanings={meanings} />
    </div>
  );
};

export default DefinitionDisplay;
