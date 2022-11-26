import React, { useMemo } from 'react';

const usePagination = ({ totalCount, pageSize, siblingCount = 1, currentPage }) => {
	const range = (start, end) => {
		let length = end - start + 1;
		return Array.from({ length }, (_, idx) => idx + start);
	};
	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalCount / pageSize);
		const totalPageNumbers = siblingCount + 5;

		if (totalPageNumbers >= totalPageCount) {
			return range(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

		const shouldShowLeftDots = leftSiblingIndex > 2;
		const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount = 3 + 2 * siblingCount;
			let leftRange = range(1, leftItemCount);

			return [...leftRange, 'DOTS', totalPageCount];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount = 3 + 2 * siblingCount;
			let rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
			return [firstPageIndex, 'DOTS', ...rightRange];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange = range(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, 'DOTS', ...middleRange, 'DOTS', lastPageIndex];
		}
	}, [totalCount, pageSize, siblingCount, currentPage]);

	return paginationRange;
};

const Paginate = (props) => {
	const { onPageChange, totalCount, siblingCount = 1, currentPage, pageSize, classes } = props;

	const paginationRange = usePagination({
		currentPage,
		totalCount,
		siblingCount,
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
		<ul className={'paginate ' + (classes ? classes : '')}>
			<li className={'pagination-item ' + (currentPage === 1 ? 'disabled' : '')} onClick={onPrevious} key='arrow-left'>
				<div className='arrow left' />
			</li>
			{paginationRange.map((pageNumber, idx) => {
				if (pageNumber === 'DOTS') {
					return <li className='pagination-item dots'>&hellip;</li>;
				}

				return (
					<li key={'Page-' + (idx + 1)} className={'pagination-item ' + (pageNumber === currentPage ? 'selected' : '')} onClick={() => onPageChange(pageNumber)}>
						{pageNumber}
					</li>
				);
			})}

			<li className={'pagination-item ' + (currentPage === lastPage ? 'disabled' : '')} onClick={onNext} key='arrow-right'>
				<div className='arrow right' />
			</li>
		</ul>
	);
};

export default Paginate;
