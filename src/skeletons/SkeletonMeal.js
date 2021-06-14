import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonMeal = ({ theme }) => {
  const themeClass = theme || 'light';

  return (
    <div className={`wrapper ${themeClass}`}>
      <div className="meals grid grid-cols-1	gap-5 mt-5 xs:grid-cols-2 sm:grid-cols-3 xl:grid-cols-4">
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
        <SkeletonElement type="imageSmall" />
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonMeal;
