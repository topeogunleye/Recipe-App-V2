import Home from './pages/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MealInfo from './components/mealinfo/MealInfo';
import Categories from './pages/Categories';
import CategoryInfo from './pages/CategoryInfo';
import RandomMeal from './pages/RandomMeal';
import NewMealForm from './pages/newmealform/NewMealForm';
import Loginsignup from './pages/loginsignup/Loginsignup';
import { DarkModeProvider } from './contexts/DarkModeProvider';
import AuthContextProvider from './contexts/AuthContext';
import { BookmarkProvider } from './contexts/BookmarkContext';
import BookMarkView from './pages/bookmark/bookmarkView';
import PrivacyNotice from './pages/privacynotice/PrivacyNotice';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { useState, useEffect } from 'react';
import TermsofUse from './pages/termsofuse/TermsofUse';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [unsubscribeFromAuth, setUnsubscribeFromAuth] = useState(null);

  useEffect(() => {
    setUnsubscribeFromAuth(
      auth.onAuthStateChanged(async (user) => {
        createUserProfileDocument(user);
        setCurrentUser(user);

        return () => {
          setUnsubscribeFromAuth();
        };
      })
    );
  }, []);

  return (
    <Router>
      <div className="App">
        <DarkModeProvider>
          <AuthContextProvider>
            <BookmarkProvider>
              <div className="content">
                <Routes>
                  <Route path="/" element={<Home />} />

                  <Route path="/MealInfo/:mealID" element={<MealInfo />} />

                  <Route path="/Categories" element={<Categories />} />

                  <Route
                    path="/CategoryInfo/:strCategory"
                    element={<CategoryInfo />}
                  />

                  <Route path="/RandomMeal/" element={<RandomMeal />} />

                  <Route path="/NewMealForm/" element={<NewMealForm />} />

                  <Route path="/loginsignup/" element={<Loginsignup />} />

                  <Route path="/privacy/" element={<PrivacyNotice />} />

                  <Route path="/terms/" element={<TermsofUse />} />

                  <Route path="/Bookmarks/" element={<BookMarkView />} />
                </Routes>
              </div>
            </BookmarkProvider>
          </AuthContextProvider>
        </DarkModeProvider>
      </div>
    </Router>
  );
}

export default App;
