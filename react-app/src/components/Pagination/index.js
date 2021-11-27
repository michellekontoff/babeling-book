import React from 'react';
import classnames from 'classnames';
import { usePagination } from './utils';
import './pagination.css';

const Pagination = (props) => {
   const {
      onPageChange,
      totalItems,
      siblings = 1,
      currentPage,
      pageSize,
      className,
   } = props;

   const paginationRange = usePagination({
      currentPage,
      totalItems,
      siblings,
      pageSize,
   });

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
         className={classnames('page-list', {
            [className]: className,
         })}
      >

         <li
            className={classnames('page-num', {
               disabled: currentPage === 1,
               pointer: currentPage !== 1
            })}
            onClick={onPrevious}
         >
            <i class="fas fa-chevron-left"></i>
         </li>
         {paginationRange.map((pageNumber) => {
            if (pageNumber === 'DOTS') {
               return <li className='page-num dots'>...</li>;
            }

            return (
               <li
                  className={classnames('page-num', {
                     selected: pageNumber === currentPage,
                     pointer: pageNumber !== currentPage
                  })}
                  onClick={() => onPageChange(pageNumber)}
               >
                  {pageNumber}
               </li>
            );
         })}

         <li
            className={classnames('page-num', {
               disabled: currentPage === lastPage,
               pointer: currentPage !== lastPage
            })}
            onClick={onNext}
         >
            <i class="fas fa-chevron-right"></i>
         </li>
      </ul>
   );
};

export default Pagination;
