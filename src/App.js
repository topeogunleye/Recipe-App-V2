import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MealInfo from './MealInfo';
import Categories from './Categories';
import CategoryInfo from './CategoryInfo';
import RandomMeal from './RandomMeal';

function App() {
  return (
    <Router>
      <div className="App">
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
      </div>
    </Router>
  );
}

export default App;
