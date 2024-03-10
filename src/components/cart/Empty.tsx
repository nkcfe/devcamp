import React from 'react';
import { TableCell, TableRow } from '../ui/table';

const Empty = () => {
  return (
    <TableRow>
      <TableCell colSpan={5} className="h-40 text-center">
        장바구니가 비었습니다.
      </TableCell>
    </TableRow>
  );
};

export default Empty;
