import React from 'react';
import { RowType } from 'shared/types/interface';

const TableRow: React.FC<RowType> = ({ row, loading }) => {
  // console.log('row', row);

  return (
    <tr>
      {row.map((item: any, index: number) => {
        return (
          <td key={index}>
            <div className="td-table-cell">{loading ? 'loading' : <>{item}</>}</div>
          </td>
        );
      })}
    </tr>
  );
};

export default TableRow;
