import PropTypes from 'prop-types';
import { useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import './search-box.css';

const SearchBox = ({
  query, handleChange, handleSubmit, handleRandom,

}) => {
  const theme = useContext(DarkModeContext);
  const { syntax, bg } = theme.mode;

  return (
    <div className="flex flex-col items-center sm:flex-row">
      <div className="flex mt-2">
        <form className="flex" onSubmit={handleSubmit}>
          <label htmlFor="search-input">
            Search For Recipes
            <input
              type="text"
              id="search-input"
              value={query}
              onChange={handleChange}
              className="border rounded-l-full w-full sm:w-80 text-black focus:outline-none"
              style={{ background: bg, color: syntax, borderColor: bg }}
              placeholder="Search For Recipes"
            />
          </label>
          <label htmlFor="submit-button">
            <button
              type="submit"
              id="submit-button"
              className="search-btn border rounded-r-full focus:outline-none"
              style={{ background: bg, color: syntax, borderColor: bg }}
            >
              <FaIcons.FaSearch className="h-5 w-5" />
            </button>
          </label>
        </form>
        <button
          type="button"
          className="random-btn border rounded-full cursor-pointer ml-2.5"
          id="random"
          style={{ background: bg, color: syntax, borderColor: bg }}
          title="Get Random Recipes"
          aria-label="Get Random Recipes"
          onClick={handleRandom}
        >
          <FaIcons.FaRandom className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

SearchBox.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleRandom: PropTypes.func,
  handleSubmit: PropTypes.func,
  query: PropTypes.string.isRequired,
};

SearchBox.defaultProps = {
  handleRandom: () => {},
  handleSubmit: () => {},
};

export default SearchBox;
