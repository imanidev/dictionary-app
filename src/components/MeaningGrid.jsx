const MeaningGrid = ({ meanings }) => {
  if (!meanings) {
    return null;
  }

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
