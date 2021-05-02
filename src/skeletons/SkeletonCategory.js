import Shimmer from './Shimmer';
import SkeletonElement from './SkeletonElement';

const SkeletonCategory = ({ theme }) => {
  const themeClass = theme || 'light';

  return (
    <div className={`wrapper ${themeClass}`}>
      <div className="grid-cols-1	gap-5 mt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
        <div className="grid place-items-center mx-0.5">
          <SkeletonElement type="catImg" />
          <SkeletonElement type="catName" />
        </div>
      </div>
      <Shimmer />
    </div>
  );
};

export default SkeletonCategory;
