import PropTypes from 'prop-types';
import { useState, createContext, useEffect } from 'react';
import useFetchMealDbApi from '../components/useFetchMealDbApi';

const BookmarkedContext = createContext({});

const BookmarkedProvider = ({ children }) => {
  const [storedBookmarked, setStoredBookmarked] = useState([]);

  setStoredBookmarked(JSON.parse(localStorage.getItem('bookmarks')));

  const [{ data }, doFetch] = useFetchMealDbApi();
  useEffect(
    () => doFetch(`https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/lookup.php?i=${storedBookmarked.idMeal}`),
    [doFetch, data, storedBookmarked],
  );

  const [bookmarked, setBookmarked] = useState([]);

  return (
    <BookmarkedContext.Provider value={{ bookmarked, setBookmarked }}>
      {children}
    </BookmarkedContext.Provider>
  );
};

BookmarkedProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { BookmarkedContext, BookmarkedProvider };
