import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MealInfo from './MealInfo';
import Categories from './Categories';
import CategoryInfo from './CategoryInfo';
import RandomMeal from './RandomMeal';
import ThemeContextProvider from './contexts/ThemeContext';

function App() {
  return (
    <Router>
      <div className="App">
        <ThemeContextProvider>
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
            </Switch>
          </div>
        </ThemeContextProvider>
      </div>
    </Router>
  );
}

export default App;
