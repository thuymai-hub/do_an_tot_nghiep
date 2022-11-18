import { useEffect, useState } from 'react';

interface IUseTableData {
  expandFilter: object;
  fetchList?: any;
}
export const useTableData = ({ expandFilter = {}, fetchList }: IUseTableData) => {
  const [dataSource, setdataSource] = useState<Array<any>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState({});
  const [paging, setPaging] = useState({
    currentPage: 1,
    total: 0,
    pageSize: 10
  });

  useEffect(() => {
    fetchDataSource();
  }, [filters, expandFilter, paging.currentPage]);

  const fetchDataSource = async () => {
    try {
      if (fetchList) {
        setLoading(true);
        const { data, meta } = await fetchList({
          ...filters,
          limit: paging.pageSize,
          page: paging.currentPage,
          ...expandFilter
        });

        setdataSource(data || []);

        setPaging({
          ...paging,
          total: meta.pagination.total,
          currentPage: meta.pagination.currentPage
        });
      }
    } catch (error) {
      console.error('Exception ' + error);
    } finally {
      setLoading(false);
    }
  };

  return {
    dataSource,
    filters,
    paging,
    loading,
    setPaging,
    setdataSource,
    setFilters,
    fetchDataSource
  };
};
