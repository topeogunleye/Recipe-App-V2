import Home from './pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import PrivacyNotice from './pages/privacynotice/PrivacyNotice'
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { useState, useEffect } from 'react';
import TermsofUse from './pages/termsofuse/TermsofUse';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [unsubscribeFromAuth, setUnsubscribeFromAuth] = useState(null);

  useEffect(() => {
   setUnsubscribeFromAuth( auth.onAuthStateChanged(async user => {
      createUserProfileDocument(user)
      setCurrentUser(user);
      console.log(user);

      return () => {
        setUnsubscribeFromAuth();
        console.log(user)
      }
    }));
  }, []);

  


  return (
    <Router>
      <div className="App">
        <DarkModeProvider>
          <AuthContextProvider>
            <BookmarkProvider>
              <div className="content">
                <Switch>
                  <Route exact path="/">
                    <Home />
                  </Route>
                  <Route exact path="/MealInfo/:mealID">
                    <MealInfo />
                  </Route>
                  <Route exact path="/Categories">
                    <Categories />
                  </Route>
                  <Route exact path="/CategoryInfo/:strCategory">
                    <CategoryInfo />
                  </Route>
                  <Route exact path="/RandomMeal/">
                    <RandomMeal />
                  </Route>
                  <Route exact path="/NewMealForm/">
                    <NewMealForm />
                  </Route>
                  <Route exact path="/loginsignup/">
                    <Loginsignup />
                  </Route>
                  <Route exact path="/privacy/">
                    <PrivacyNotice />
                  </Route>
                  <Route exact path="/terms/">
                    <TermsofUse/>
                  </Route>
                  <Route exact path="/Bookmarks/">
                    <BookMarkView />
                  </Route>
                </Switch>
              </div>
            </BookmarkProvider>
          </AuthContextProvider>
        </DarkModeProvider>
      </div>
    </Router>
  );
}

export default App;
