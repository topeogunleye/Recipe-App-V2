import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeProvider';
import './Meal.css';

const MealItem = ({ meal }) => {
  const theme = useContext(DarkModeContext);
  const { syntax, bg } = theme.mode;
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

    </div>
  );
};

MealItem.propTypes = {
  meal: PropTypes.shape({
    idMeal: PropTypes.string,
    strCategory: PropTypes.string,
    strMeal: PropTypes.string,
    strMealThumb: PropTypes.string,
  }),
};

MealItem.defaultProps = {
  meal: {
    idMeal: '',
    strCategory: '',
    strMeal: '',
    strMealThumb: '',
  },
};

export default MealItem;
