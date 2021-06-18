import { useState, useContext, createContext } from 'react';

const BookmarkContext = createContext({});

const BookmarkProvider = (props) => {
  let [bookmarks, setBookmarks] = useState([]);

  return (
    <BookmarkContext.Provider value={{bookmarks, setBookmarks}}>
      {props.children}
    </BookmarkContext.Provider>
  );
};

export { BookmarkContext, BookmarkProvider };
