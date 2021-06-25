import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import { useContext } from 'react';
import * as FaIcons from 'react-icons/fa';
import './search-box.css';

const SearchBox = ({ query, handleChange, handleSubmit }) => {
  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg, opacity, isDark } = theme.mode;

  return (
    <div className="flex flex-col items-center sm:flex-row">
      <div className="flex mt-2">
        <form className="flex" onSubmit={handleSubmit}>
          <input
            type="text"
            value={query}
            onChange={handleChange}
            className="border rounded-full w-full sm:w-72 text-black focus:outline-none"
            style={{ background: bg, color: syntax }}
            placeholder="Search For Recipes"
          />

          <button
            className="search-btn border rounded-full focus:outline-none"
            type="submit"
            style={{ background: bg, color: syntax }}
          >
            <FaIcons.FaSearch className="h-5 w-5" />
          </button>
        </form>
        <Link to={'/RandomMeal/'}>
          <button
            className="random-btn border rounded-full cursor-pointer ml-2.5"
            id="random"
            style={{ background: bg, color: syntax }}
            title="Get Random Recipes"
            aria-label="Get Random Recipes"
          >
            <FaIcons.FaRandom className="h-5 w-5" />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SearchBox;
