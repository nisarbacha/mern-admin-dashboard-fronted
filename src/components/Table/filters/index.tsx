import type { IFilter } from '../../../types/interface/table.interface';
import MultiSelectionFilter from './MultiSelectionFilter';
import type { ColumnType } from 'antd/es/table';

type MultiSelectOptions = { label: string; value: string }[];

export function withMultiSelectFilter<T>(
  options: MultiSelectOptions,
  key: keyof T
): Partial<ColumnType<T>> {
  return {
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
      <MultiSelectionFilter
        value={selectedKeys as string[]}
        onChange={(value) => {
          setSelectedKeys(value);
          confirm();
        }}
        options={options}
        onFinish={(values: IFilter) => {
          console.log('testing withMultiSelectFilter', values);
        }} field={''} />
    ),
    onFilter: (value, record) => record[key] === value,
  };
}
