/**
 * InputForm component for displaying an input form.
 * @param {Object} props - Component props.
 * @param {Function} props.onSubmit - Function to handle form submission.
 * @param {Function} props.onInputChange - Function to handle input change.
 * @param {string} props.userInput - Current value of the input field.
 * @returns {JSX.Element} Input form JSX.
 */

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
