import PropTypes from 'prop-types';
import { useState, createContext } from 'react';

const BookmarkContext = createContext({});

const BookmarkProvider = ({ children }) => {
  const [bookmarks, setBookmarks] = useState([]);

  return (
    <BookmarkContext.Provider value={{ bookmarks, setBookmarks }}>
      {children}
    </BookmarkContext.Provider>
  );
};

BookmarkProvider.propTypes = {
  children: PropTypes.node,
};

BookmarkProvider.defaultProps = {
  children: null,
};

export { BookmarkContext, BookmarkProvider };
