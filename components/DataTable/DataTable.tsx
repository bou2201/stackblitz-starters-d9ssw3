'use client';

import { KeyValues } from '@/type/common.type';
import { Pagination } from './Pagination';
import { Spinner } from './Spinner';

type Alignment = 'center' | 'left' | 'right' | 'justify' | 'char';

type ItemTableProps<T> = {
  key?: keyof T;
  header: React.ReactNode;
  alignment?: Alignment;
  index?: number;
  classRow?: string;
  render?: (value: T, index: number) => React.ReactNode;
  onClick?: (value: T, event: React.MouseEvent<HTMLTableCellElement>) => void;
};

type DataTableProps<T> = {
  columns: readonly ItemTableProps<T>[];
  rows: readonly T[];
  itemsPerPage: number;
  total: number;
  isLoading?: boolean;
  pageIndex?: number;
  setPageIndex?: (page: number) => void;
};

export const DataTable = <T extends KeyValues>({
  columns,
  rows,
  itemsPerPage,
  total,
  isLoading,
  pageIndex,
  setPageIndex,
}: DataTableProps<T>) => {
  return (
    <section
      className="relative w-full max-w-full bg-white bg-clip-border drop-shadow-md px-5 overflow-auto"
      style={{ minHeight: '18rem' }}
    >
      <div className="flex flex-col min-w-0 break-words bg-white border-0 shadow-soft-xl rounded-2xl bg-clip-border">
        {isLoading && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(225, 225, 225, 0.6)' }}
          >
            <Spinner />
          </div>
        )}
        <div className="table-responsive h-full">
          <table
            className="table table-flush text-slate-950 w-full h-full"
            id="datatable"
          >
            <thead className="thead-light border-b-2">
              <tr>
                {columns.map((item, index: number) => (
                  <th
                    key={index}
                    align={item.alignment ?? 'center'}
                    className="p-3 font-bold"
                  >
                    {item.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows && rows.length > 0 ? (
                rows.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b-2 hover:bg-gray-100 cursor-pointer transition-all"
                  >
                    {columns.map((item, index) => (
                      <td
                        key={index}
                        align={item.alignment}
                        onClick={(event) =>
                          item.onClick && item?.onClick(row, event)
                        }
                        className={`${item.classRow} font-normal leading-normal text-sm py-3 px-4 font-medium`}
                      >
                        {item?.render
                          ? item.render(row, index)
                          : row[item?.key as string]}
                      </td>
                    ))}
                  </tr>
                ))
              ) : (
                <tr>
                  <td align="center" colSpan={columns.length ?? 0}>
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <Pagination
            itemsPerPage={itemsPerPage}
            total={total}
            pageIndex={pageIndex as number}
            setPageIndex={setPageIndex as (page: number) => void}
          />
        </div>
      </div>
    </section>
  );
};
