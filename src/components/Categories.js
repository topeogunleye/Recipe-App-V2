import { Link } from 'react-router-dom';
import useFetchMealDbApi from './useFetchMealDbApi';
import { useContext } from 'react';
import SkeletonCategory from '../skeletons/SkeletonCategory';
import { ThemeContext } from '../contexts/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';
import Navbar from './Navbar/Navbar';

const Categories = ({ ref = 'scroller' }) => {
  const [
    { data, isLoading, isError },
    doFetch,
  ] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v1/1/categories.php`,
    { categories: [] }
  );

  if (data) {
    console.log(data);
  }

  const { isLightTheme, light, dark } = useContext(ThemeContext);
  const theme = isLightTheme ? light : dark;
  const loaderTheme = isLightTheme ? 'light' : 'dark';

  return (
    <div className="">
      <Navbar />
      <div
        style={{ background: theme.ui, color: theme.syntax }}
        className="min-h-screen pb-1"
      >
        <div className="max-w-3xl mx-auto text-center mb-2">
          <h3 className="text-lg text-gray-400">Categories</h3>
          <div className="category">
            {isError && <div>Something went wrong ...</div>}
            {isLoading
              ? // <div>Loading ...</div>
                [1, 2, 3, 4, 5].map((n) => (
                  <SkeletonCategory Key={n} theme={loaderTheme} />
                ))
              : data.categories &&
                data.categories.map((category) => (
                  <span className="mx-auto" key={category.idCategory}>
                    <Link
                      to={`/CategoryInfo/${category.strCategory}`}
                      className="mx-0.5"
                    >
                      <img
                        className="cat-img"
                        src={category.strCategoryThumb}
                        alt={category.strMeal}
                      />
                      <h2 className="categories">{category.strCategory}</h2>
                    </Link>
                  </span>
                ))}
          </div>

          <div
            className="absolute top-5 right-10
          "
          >
            <ThemeToggle
              className="cursor-pointer focus:outline-none"
              id="random"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Categories;
