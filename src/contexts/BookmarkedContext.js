import { useState, useContext, createContext, useEffect } from 'react';
import useFetchMealDbApi from '../components/useFetchMealDbApi';
import { BookmarkContext } from './BookmarkContext';

const BookmarkedContext = createContext({});

const BookmarkedProvider = (props) => {
  const [storedBookmarked, setStoredBookmarked] = useState([]);

  setStoredBookmarked(JSON.parse(localStorage.getItem('bookmarks')));

  const [{ data }, doFetch] = useFetchMealDbApi()
useEffect(
  () =>
    doFetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${storedBookmarked.idMeal}`),
  [doFetch, data, storedBookmarked]
);

  let [bookmarked, setBookmarked] = useState([]);

  return (
    <BookmarkedContext.Provider value={{bookmarked, setBookmarked}}>
      {props.children}
    </BookmarkedContext.Provider>
  );
}

export { BookmarkedContext, BookmarkedProvider };
