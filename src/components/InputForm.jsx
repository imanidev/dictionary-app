const InputForm = ({ onSubmit, onInputChange, userInput }) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="search-container">
        <div>
          <input
            className="searchbar"
            type="text"
            name="input"
            onChange={onInputChange}
            value={userInput}
            placeholder="Please enter a word"
          />
        </div>
        <div>
          <button type="submit" className="search-btn">
            search
          </button>
        </div>
      </div>
      <p className="main-p">Press search to look up {userInput}</p>
    </form>
  );
};

export default InputForm;
