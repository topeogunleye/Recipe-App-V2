import Home from './components/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MealInfo from './components/MealInfo';
import Categories from './components/Categories';
import CategoryInfo from './components/CategoryInfo';
import RandomMeal from './components/RandomMeal';
import NewMealForm from './components/NewMealForm';
import Loginsignup from './components/Loginsignup';
import { DarkModeProvider } from './contexts/DarkModeProvider';
import AuthContextProvider from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <div className="App">
        <DarkModeProvider>
          <AuthContextProvider>
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
          </AuthContextProvider>
        </DarkModeProvider>
      </div>
    </Router>
  );
}

export default App;
