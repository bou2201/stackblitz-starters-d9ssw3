'use client';

import { memo } from 'react';

type PaginationProps = {
  itemsPerPage: number;
  total: number;
  pageIndex: number;
  setPageIndex: (page: number) => void;
};

export const Pagination = memo(
  ({ itemsPerPage, total, pageIndex, setPageIndex }: PaginationProps) => {
    const totalPages = Math.ceil(total / itemsPerPage);

    return (
      <nav className="p-6 text-center" aria-label="Pagination">
        <ul className="inline-flex gap-2 align-center">
          <p
            className={`text-slate-900 text-sm rounded-md font-semibold transition-all cursor-pointer mr-3`}
            style={{ paddingTop: '6px' }}
            onClick={() => {
              if (pageIndex > 1) {
                setPageIndex(pageIndex - 1);
              }
            }}
          >
            Prev
          </p>
          {Array.from({ length: totalPages }).map((_, index) => (
            <li key={index}>
              <button
                className={`text-slate-900 text-sm rounded-md font-semibold transition-all w-8 h-8 hover:bg-gray-200 ${
                  pageIndex === index + 1 && 'bg-gray-200'
                }`}
                onClick={() => setPageIndex(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <p
            className="text-slate-900 text-sm rounded-md font-semibold transition-all cursor-pointer ml-3"
            style={{ paddingTop: '6px' }}
            onClick={() => {
              if (pageIndex < totalPages) {
                setPageIndex(pageIndex + 1);
              }
            }}
          >
            Next
          </p>
        </ul>
      </nav>
    );
  }
);
