import { useMemo } from "react";


export const usePagination = ({
    totalItems,
    pageSize,
    siblings = 1,
    currentPage
  }) => {
    const paginationRange = useMemo(() => {
        const totalPages = Math.ceil(totalItems / pageSize);

        const totalPageNumbers = siblings + 5;
    
        if (totalPageNumbers >= totalPages) {
          return range(1, totalPages);
        }

        const leftSiblingIdx = Math.max(currentPage - siblings, 1);
        const rightSiblingIdx = Math.min(
          currentPage + siblings,
          totalPages
        );
    
        const showLeftDots = leftSiblingIdx > 2;
        const showRightDots = rightSiblingIdx < totalPages - 2;
    
        const firstPageIdx = 1;
        const lastPageIdx = totalPages;
    
        if (!showLeftDots && showRightDots) {
          let leftItemCount = 3 + 2 * siblings;
          let leftRange = range(1, leftItemCount);
    
          return [...leftRange, DOTS, totalPages];
        }
    
        if (showLeftDots && !showRightDots) {
          
          let rightItemCount = 3 + 2 * siblings;
          let rightRange = range(
            totalPages - rightItemCount + 1,
            totalPages
          );
          return [firstPageIdx, DOTS, ...rightRange];
        }
         
        if (showLeftDots && showRightDots) {
          let middleRange = range(leftSiblingIdx, rightSiblingIdx);
          return [firstPageIdx, DOTS, ...middleRange, DOTS, lastPageIdx];
        }
        
    }, [totalItems, pageSize, siblings, currentPage]);
  
    return paginationRange;
  };
