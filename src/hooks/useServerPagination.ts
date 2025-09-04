// hooks/useServerPagination.ts
import { useState } from 'react';
import type { IQueryParams } from '../types/interface/table.interface';



export const useServerPagination = (initial: Partial<IQueryParams> = {}) => {
  const [queryParams, setQueryParams] = useState<IQueryParams>({
    currentPage: initial.currentPage || 1,
    perPage: initial.perPage || 10,
    filters: initial.filters,
    total: initial.total,
  });


  const updateTotal = (total: number) => {
    setQueryParams((prev) => ({ ...prev, total }));
  };

  return {
    queryParams,
    setQueryParams,
    updateTotal,
  };
};
