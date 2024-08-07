import { Link } from 'react-router-dom';
import { useContext } from 'react';
import useFetchMealDbApi from '../components/useFetchMealDbApi';
import SkeletonCategory from '../skeletons/SkeletonCategory';
import { DarkModeContext } from '../contexts/DarkModeProvider';
import ThemeToggle from '../components/theme-toggle/ThemeToggle';
import Navbar from '../components/Navbar/Navbar';

const Categories = () => {
  const [
    { data, isLoading, isError },
  ] = useFetchMealDbApi(
    `https://www.themealdb.com/api/json/v2/${process.env.REACT_APP_API_KEY}/categories.php`,
    { categories: [] },
  );

  const theme = useContext(DarkModeContext);
  const { syntax, ui, isDark } = theme.mode;
  const loaderTheme = isDark ? 'dark' : 'light';

  return (
    <div className="transition-all duration-1000 ease-out">
      <Navbar />
      <div
        style={{ background: ui, color: syntax }}
        className="min-h-screen pb-1 transition-all duration-1000 ease-out"
      >
        <div className=" lg:max-w-3xl xl:max-w-4xl  mx-auto lg:pl-32 text-center mb-2">
          <h3 className="text-lg lg:-ml-2">Categories</h3>
          <div className="category">
            {isError && <div>Something went wrong ...</div>}
            {isLoading
              ? [1, 2, 3, 4, 5].map((n) => (
                <SkeletonCategory key={n} theme={loaderTheme} />
              ))
              : data.categories
                && data.categories.map((category) => (
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
