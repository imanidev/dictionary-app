import DefinitionAudio from "./DefinitionAudio";
import MeaningGrid from "./MeaningGrid";
import "../css/definition.css";
/**
 * DefinitionDisplay Component
 *
 * Top-level component for displaying definition results.
 * Renders phonetic information and meanings grid.
 *
 * @param {Object} props - Component props.
 * @param {Object} props.definition - Definition object from state.
 * @param {string} props.userInput - User input string.
 * @param {string} props.word - Word string for comparison.
 * @returns {JSX.Element | null} Definition layout or null if conditions aren't met.
 */

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
