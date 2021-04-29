import { Link } from 'react-router-dom';
import useFetchMealDbApi from './useFetchMealDbApi';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import chicken from './chicken.jpg';
import CategoryInfo from './CategoryInfo';
import ScrollMenu from 'react-horizontal-scrolling-menu';


const Categories = ({mealImg}) => {
  const [category, setCategory] = useState('');
  const [
    { data, isLoading, isError },
    doFetch,
  ] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    { categories: [] }
  );


  if (data) {
    console.log(data)
  }

  // useEffect(
  //   () =>
  //     doFetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${}`),
  //   [doFetch, data]

  // );

  return (
    <div className="relative">
    <div className="wrapper scrollmenu">
      {data.categories &&
        data.categories.map((category) => (
          <span className="scrollmenu-item box" key={category.idCategory}>
            
            <Link
              to={`/CategoryInfo/${category.strCategory}`}
              className="lozenge btn-lozenge"
              onClick={() => {
                doFetch(
                  `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category.strCategory}`
                );
              }}
            >
              <img
                className="meal-img"
                src={category.strCategoryThumb}
                alt={category.strMeal}
              />
              <h2 className="font-regular text-base">{category.strCategory}</h2>
            </Link>
          </span>
        ))}
    </div>
    </div>
  );
};
export default Categories;
