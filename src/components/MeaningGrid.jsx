/**
 * MeaningGrid Component
 *
 * Component for displaying a grid of meanings for a given word.
 * Each meaning includes its part of speech and definitions.
 *
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.meanings - Array of meaning objects, each containing partOfSpeech and definitions.
 * @returns {JSX.Element | null} Meaning grid layout or null if meanings are not provided.
 */
const MeaningGrid = ({ meanings }) => {
  if (!meanings) {
    return null;
  }

  /**
   * Function to render all meanings of a given part of speech into li elements
   * @param {Object} meaning - Meaning object containing partOfSpeech and definitions.
   * @returns {Array<JSX.Element>} Array of list items representing each definition.
   */
  function showAllMeanings(meaning) {
    return meaning.definitions.map((def, index) => (
      <li key={index} className="definition-grid__meaning">
        <i className="bx bx-book-alt"></i> {def.definition}
      </li>
    ));
  }

  return (
    <section className="definition-grid">
      {meanings.map((meaning, index) => (
        <div key={index} className="definition-grid__definition-container">
          <h3 className="definition-grid__header">
            <span>{index + 1}.</span>{" "}
            <span style={{ fontWeight: 900, fontStyle: "italic" }}>
              "{meaning.partOfSpeech}"
            </span>
          </h3>
          <div className="definition-grid__text-container">
            <ul className="definition-answers">{showAllMeanings(meaning)}</ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MeaningGrid;
