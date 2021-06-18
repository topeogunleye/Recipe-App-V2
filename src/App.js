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

function App() {
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
