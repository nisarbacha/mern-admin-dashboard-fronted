import { useFilterStore } from '@/store';
import { Tag } from 'antd';

const colors = [
    'green',
    'purple',
    'magenta',
    'geekblue',
    'volcano',
    'orange',
    'gold',
    'red',
    'lime',
    'cyan',
    'blue',
];

const FilterTag = () => {
    const { filters, removeFilter } = useFilterStore();
    const activeFilters = Object.values(filters);

    if (activeFilters.length === 0) return null;

    return (
        <>
            {activeFilters.map((filter, index) => (
                <Tag
                    style={{
                        padding: '4px 10px',
                        fontWeight: 500,
                        borderRadius: '8px',
                    }}
                    key={filter.field}
                    color={colors[index % colors.length]}
                    closable
                    onClose={(e) => {
                        e.preventDefault();
                        removeFilter(filter.field);
                    }}
                >
                    {filter.label}
                </Tag>
            ))}
        </>
    );
};

export default FilterTag;
