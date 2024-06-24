const MeaningGrid = ({ meanings }) => {
  if (!meanings) {
    return null;
  }

  function showAllMeanings(meaning) {
    return meaning.definitions.map((def, index) => (
      <li key={index} className="definition-grid__meaning">
        {def.definition}
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
          <div className="definition-grid__text">
            <ul
              className="definition-grid__meanings-wrapper"
              style={{
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "2em",
              }}
            >
              {showAllMeanings(meaning)}
            </ul>
          </div>
        </div>
      ))}
    </section>
  );
};

export default MeaningGrid;
