/* This example requires Tailwind CSS v2.0+ */
import PropTypes from 'prop-types';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import React, { useContext } from 'react';
import { DarkModeContext } from '../../contexts/DarkModeProvider';

const Pagination = ({
  postsPerPage,
  totalPosts,
  paginate,
  indexOfFirstPost,
  indexOfLastPost,
  handleNextbtn,
  handlePrevbtn,
  currentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  const theme = useContext(DarkModeContext);
  const { syntax, ui, bg } = theme.mode;

  return (
    <div className="px-4 py-3 flex items-center justify-between border-t border-gray-600 sm:px-6">
      <div className="flex-1 flex justify-center sm:hidden">
        <button
          type="button"
          onClick={handlePrevbtn}
          disabled={currentPage === pageNumbers[0]}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          style={{ background: bg, color: syntax }}
        >
          Previous
        </button>

        <button
          type="button"
          onClick={handleNextbtn}
          disabled={
                        currentPage === pageNumbers[pageNumbers.length - 1]
                    }
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:text-gray-500"
          style={{ background: bg, color: syntax }}
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm" style={{ background: ui, color: syntax }}>
            Showing
            {' '}
            <span className="font-medium">{indexOfFirstPost + 1}</span>
            {' '}
            to
            {' '}
            <span className="font-medium">{indexOfLastPost}</span>
            {' '}
            of
            {' '}
            <span className="font-medium">{totalPosts}</span>
            {' '}
            recipes
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={handlePrevbtn}
              disabled={currentPage === pageNumbers[0]}
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              style={{ background: bg, color: syntax }}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((number) => (
              <button
                type="button"
                onClick={() => paginate(number)}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                key={number}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              onClick={handleNextbtn}
              disabled={
                                currentPage === pageNumbers[pageNumbers.length - 1]
                            }
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              style={{ background: bg, color: syntax }}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  handleNextbtn: PropTypes.func.isRequired,
  handlePrevbtn: PropTypes.func,
  indexOfFirstPost: PropTypes.number.isRequired,
  indexOfLastPost: PropTypes.number.isRequired,
  paginate: PropTypes.func,
  postsPerPage: PropTypes.number.isRequired,
  totalPosts: PropTypes.number.isRequired,
};

Pagination.defaultProps = {
  paginate: undefined,
};

Pagination.defaultProps = {
  handlePrevbtn: undefined,
};

export default Pagination;
