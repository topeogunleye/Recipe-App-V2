import MealItem from '../../components/meal/Meal';
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect, useContext } from 'react';
import { BookmarkContext } from '../../contexts/BookmarkContext';
import Navbar from '../../components/Navbar/Navbar';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import ThemeToggle from '../../components/theme-toggle/ThemeToggle';
import { auth } from '../../firebase/firebase.utils';
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'

const BookMarkView = () => {
  const [storedBookmarks, setStoredBookmarks] = useState(null);

  const { bookmarks } = useContext(BookmarkContext);

  useEffect(() => {
    setStoredBookmarks(JSON.parse(localStorage.getItem('bookmarks')));
  }, [bookmarks]);

  // https://dev.to/marinamosti/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
  const uniqueBookmarks =
    storedBookmarks &&
    Array.from(new Set(storedBookmarks.map((a) => a.idMeal))).map((idMeal) => {
      return storedBookmarks.find((a) => a.idMeal === idMeal);
    });

  const [userID, setUserID] = useState(null);
  const [userData ] = useState({name: 'Tope'})

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUserID(user.uid);
    });
  }, []);


  // setUserData({lastLoginTime: new Date()})
  firebase.firestore().doc(`/Users/${userID}`).set(userData)

  const theme = useContext(DarkModeContext);
  const { syntax, ui } = theme.mode;

  return (
    <div
      className="bg-gray-500 text-white min-h-screen transition-all duration-1000 ease-out"
      style={{ background: ui, color: syntax }}
    >
      <Navbar />
      <div className="m-auto lg:pl-32 max-w-md sm:max-w-lg md:max-w-5xl flex flex-col items-center justify-center text-center pb-10">
        <div
          className="absolute top-5 right-10
    "
        >
          <ThemeToggle
            className="cursor-pointer focus:outline-none"
            id="random"
          />
        </div>
        <h1 className="text-lg lg:-ml-2">My Bookmarks</h1>
        {!storedBookmarks ? (
          <div id="meals" className="py-2">
            No bookmarks yet. Find a nice recipe and bookmark it :)
          </div>
        ) : (
          <div id="meals" className="meals">
            {storedBookmarks &&
              uniqueBookmarks.map((meal) => (
                <MealItem meal={meal} key={uuidv4()} />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookMarkView;
