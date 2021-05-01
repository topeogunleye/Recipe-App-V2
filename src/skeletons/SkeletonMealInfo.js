import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonMealInfo = ({ theme }) => {
  const themeClass = theme || 'light';

  return (
    <div className={`skeleton-wrapper ${themeClass}`}>
      <div className="skeleton-article flex flex-col items-center justify-center text-center">
        <SkeletonElement type="title" />
        <SkeletonElement type="imageBig" />
        <SkeletonElement type="mealInfo" />
        <SkeletonElement type="mealInfo" />
        <SkeletonElement type="textBig" />
        <ul className="single-meal-ul">
      
            <SkeletonElement type="liText" class="single-meal-ul-li" />
        
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
         
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
         
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
          
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
         
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
        
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
         
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
         
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
          
          
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
       
        
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
      
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
         
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
        
            <SkeletonElement type="liText" class="single-meal-ul-li"/>
          
        </ul>
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonMealInfo;
