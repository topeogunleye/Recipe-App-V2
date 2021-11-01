import { Link } from 'react-router-dom';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import { useContext } from 'react';
import './Meal.css';

const MealItem = ({ meal }) => {
  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg, opacity, isDark } = theme.mode;
  return (
    <div
      className="meal hover:shadow-lg transition-all duration-1000 ease-out"
      key={meal.idMeal}
      style={{ background: bg, color: syntax }}
    >
      <Link to={`/MealInfo/${meal.idMeal}`}>
        <img
          src={meal.strMealThumb}
          alt="stew"
          className="h-40 sm:h-40 w-full object-cover hover:opacity-75 transition-opacity duration-200 ease-in"
        />
        <div className="m-4">
          <span className="font-bold">{meal.strMeal}</span>
          <span className="block text-sm">{meal.strCategory}</span>
        </div>
      </Link>

      {/* <button
                      className="home-btn absolute top-1 left-1 sm:top-0 am:left-2 hover:bg-white  py-2 px-2 rounded-sm"
                      style={{ background: bg, color: syntax }}
                    >
                      <BookmarkIcon className="home-icon h-5 w-5  hover:text-black" />
                    </button> */}
    </div>
  );
};

export default MealItem;
