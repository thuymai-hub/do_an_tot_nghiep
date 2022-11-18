import React from 'react';
import TableHeadItem from './TableHeadItem';
import TableRow from './TableRow';
import './style.css';
import { IColumn, TableProps } from 'shared/types/interface';
import Skeleton from 'react-loading-skeleton';
import { Pagination } from '../Pagination/Pagination';

export const Table: React.FC<TableProps> = ({
  columns,
  dataSource,
  customClass = '',
  onClickRow,
  loading,
  position = 'bottom-right',
  paging
}) => {
  const positionPagination = (value: string) => {
    switch (value) {
      case 'left':
        return 'left';
      case 'center':
        return 'center';
      case 'right':
        return 'right';
      default:
        return 'right';
    }
  };

  const renderHeaderTable = () => {
    return (
      <tr>
        {columns.map((item: IColumn) => {
          return <TableHeadItem key={item.title} item={item} width={item.width} />;
        })}
      </tr>
    );
  };

  const renderRows = () => {
    return (
      <>
        {loading ? (
          <>
            {[1, 2, 3, 4, 5].map((item: number) => {
              return (
                <tr key={item}>
                  {columns.map((item: IColumn) => {
                    return (
                      <td key={item.keyData}>
                        <div className="td-table-cell">
                          <Skeleton style={{ width: '50%' }} />
                        </div>
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </>
        ) : (
          <>
            {dataSource.length ? (
              <>
                {dataSource.map((item: any) => {
                  const row = columns.map((column: IColumn, index: number) => {
                    if (column.render) {
                      return column.render(item[column.keyData], index, item);
                    } else {
                      return item[column.keyData];
                    }
                  });
                  return <TableRow key={item.id} row={row} onClickRow={onClickRow} />;
                })}
              </>
            ) : (
              <td colSpan={columns.length}>
                <div className="td-table-empty">
                  <div className="flex flex-col items-center">
                    <svg
                      className="ant-empty-img-simple"
                      width="64"
                      height="41"
                      viewBox="0 0 64 41"
                      xmlns="http://www.w3.org/2000/svg">
                      <g transform="translate(0 1)" fill="none" fillRule="evenodd">
                        <ellipse
                          className="ant-empty-img-simple-ellipse"
                          cx="32"
                          cy="33"
                          rx="32"
                          ry="7"></ellipse>
                        <g className="ant-empty-img-simple-g" fillRule="nonzero">
                          <path d="M55 12.76L44.854 1.258C44.367.474 43.656 0 42.907 0H21.093c-.749 0-1.46.474-1.947 1.257L9 12.761V22h46v-9.24z"></path>
                          <path
                            d="M41.613 15.931c0-1.605.994-2.93 2.227-2.931H55v18.137C55 33.26 53.68 35 52.05 35h-40.1C10.32 35 9 33.259 9 31.137V13h11.16c1.233 0 2.227 1.323 2.227 2.928v.022c0 1.605 1.005 2.901 2.237 2.901h14.752c1.232 0 2.237-1.308 2.237-2.913v-.007z"
                            className="ant-empty-img-simple-path"></path>
                        </g>
                      </g>
                    </svg>
                    <span className="text-gray-400">No data</span>
                  </div>
                </div>
              </td>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <div className={`mb-2 ${position.split('-')[0] === 'top' ? '' : 'hidden'}`}>
        <Pagination
          total={paging?.total || dataSource.length}
          pageSize={paging?.pageSize}
          currentPage={paging?.currentPage}
          onChangePage={(page: number) => {
            paging?.onChangePage && paging.onChangePage(page);
          }}
        />
      </div>
      <div className="td-table-wrapper">
        <table className={`${customClass} td-table`}>
          <thead className="td-table-head">{renderHeaderTable && renderHeaderTable()}</thead>
          <tbody className="td-table-body">{renderRows && renderRows()}</tbody>
        </table>
      </div>
      {dataSource.length ? (
        <div className={`mt-2 ${position.split('-')[0] === 'bottom' ? '' : 'hidden'} `}>
          <Pagination
            total={paging?.total || dataSource.length}
            pageSize={paging?.pageSize}
            currentPage={paging?.currentPage}
            position={positionPagination(position.split('-')[1])}
            onChangePage={(page: number) => {
              paging?.onChangePage && paging.onChangePage(page);
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
