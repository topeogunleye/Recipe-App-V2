import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonHeader = ({ theme }) => {
  const themeClass = theme || 'light';

  return (
    <div className={`wrapper ${themeClass}`}>
        <div className="meals grid grid-cols-1	gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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

export default SkeletonHeader;
