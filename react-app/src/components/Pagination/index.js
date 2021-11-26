import React from 'react';
import classnames from 'classnames';
import { usePagination } from './utils';
// import './pagination.scss';

const Pagination = (props) => {
   const {
      onPageChange,
      totalItems,
      siblings = 1,
      currentPage,
      pageSize,
      className,
   } = props;

//    console.log(totalItems)
   const paginationRange = usePagination({
      currentPage,
      totalItems,
      siblings,
      pageSize,
   });
//    console.log(paginationRange)

   if (currentPage === 0 || paginationRange.length < 2) {
      return null;
   }

   const onNext = () => {
      onPageChange(currentPage + 1);
   };

   const onPrevious = () => {
      onPageChange(currentPage - 1);
   };

   let lastPage = paginationRange[paginationRange.length - 1];
   return (
      <ul
         className={classnames('pagination-container', {
            [className]: className,
         })}
      >
         {/* Left navigation arrow */}
         <li
            className={classnames('pagination-item', {
               disabled: currentPage === 1,
            })}
            onClick={onPrevious}
         >
            <div className='arrow left' />
         </li>
         {paginationRange.map((pageNumber) => {
            if (pageNumber === 'DOTS') {
               return <li className='pagination-item dots'>...</li>;
            }

            return (
               <li
                  className={classnames('pagination-item', {
                     selected: pageNumber === currentPage,
                  })}
                  onClick={() => onPageChange(pageNumber)}
               >
                  {pageNumber}
               </li>
            );
         })}
         {/*  Right Navigation arrow */}
         <li
            className={classnames('pagination-item', {
               disabled: currentPage === lastPage,
            })}
            onClick={onNext}
         >
            <div className='arrow right' />
         </li>
      </ul>
   );
};

export default Pagination;
