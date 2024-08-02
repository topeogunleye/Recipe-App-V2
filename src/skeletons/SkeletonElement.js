import PropTypes from 'prop-types';
import './Skeleton.css';

const SkeletonElement = ({ type }) => {
  const classes = `skeleton ${type}`;

  return (
    <div className={classes} />
  );
};

SkeletonElement.propTypes = {
  type: PropTypes.string,
};

SkeletonElement.defaultProps = {
  type: '',
};

export default SkeletonElement;
