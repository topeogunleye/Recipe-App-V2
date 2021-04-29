import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MealInfo from './MealInfo';
import Categories from './Categories';
import CategoryInfo from './CategoryInfo';

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
              <MealInfo/>
            </Route>
            <Route exact path="/Categories">
              <Categories/>
            </Route>
            <Route exact path="/CategoryInfo/:strCategory">
              <CategoryInfo/>
            </Route>
            
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
