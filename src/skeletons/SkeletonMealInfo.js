import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonMealInfo = ({ theme }) => {
  const themeClass = theme || 'light';

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className=" max-w-4xl md:max-w-2xl lg:max-w-4xl mx-auto skeleton-article items-center md:mt-8 flex flex-col-reverse w-full align-center justify-between md:flex-row">
        <div className="recipe-details flex flex-col">
          <SkeletonElement
            type="title"
            className="mt-0 ml-2 mb-4 sm:w-full md:mb-8"
          />

          <div className="recipe-summary-item flex w-full justify-center items-center md:justify-start">
            <SkeletonElement type="Ingredients" />

            <SkeletonElement type="Minutes" />

            <SkeletonElement type="Calories" />
          </div>
          <div className="text-center">
            <div className="mx-16 sm:mx-0">
              <SkeletonElement type="Ing-title" />
            </div>
            <div className="mt-0 text-center sm:text-justify m-8 single-meal-ul-skel grid grid-cols-4 sm:w-96 place-items-center w-8/12 mx-auto">
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
              <SkeletonElement type="li-el" className="mx-px" />
            </div>
          </div>
        </div>

        <SkeletonElement type="imageMealInfo" />
      </div>
      <div className="">
        <SkeletonElement type="Meal-Info-p" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonMealInfo;
/* <SkeletonElement type="mealInfo" />
        <SkeletonElement type="mealInfo" />
        <SkeletonElement type="textBig" />
        < */
