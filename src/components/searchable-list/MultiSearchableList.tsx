import { Card, Checkbox, Empty, Flex, Input, Space } from 'antd';
import { memo, useMemo, useState, type FC, } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import type { $option } from '../../types/interface/option.interface';
import { SearchOutlined } from '@ant-design/icons';

interface IProps {
    spacing?: 'small' | 'medium' | 'large'
    value?: string[] // controlled value from Form.Item
    onChange?: (v: string[]) => void // update form value
    defaultValues?: string[]
    options: $option[] | undefined
    minHeight?: string
    disabled?: boolean
    loading?: boolean
    testid?: string
    label?: string
}

const MultiSearchableList: FC<IProps> = ({
    options = [],
    value = [],
    onChange,
    spacing = 'small',
    loading,
    testid = 'multi-search',
    disabled,
}) => {
    const [term, setTerm] = useState<string>('');

    const filteredOptions = useMemo(() => {
        return term
            ? options.filter((option) =>
                option.label.toLowerCase().includes(term.toLowerCase())
            )
            : options;
    }, [term, options]);

    const _spacing = spacing === 'small' ? 4 : spacing === 'large' ? 16 : 8;

    const handleChange = (newSelected: string[]) => {
        onChange?.(newSelected);
    };

    const toggleSingle = (checked: boolean, optionValue: string) => {
        if (checked) {
            handleChange([...value, optionValue]);
        } else {
            handleChange(value.filter((val) => val !== optionValue));
        }
    };

    const toggleSelectAll = (checked: boolean) => {
        const enabledOptions = filteredOptions.filter((o) => !o.disabled).map((o) => o.value);
        if (checked) {
            handleChange(enabledOptions);
        } else {
            handleChange([]);
        }
    };

    const isAllSelected =
        filteredOptions.length > 0 &&
        value.length === filteredOptions.filter((o) => !o.disabled).length;

    const isIndeterminate =
        value.length > 0 && value.length < filteredOptions.filter((o) => !o.disabled).length;

    return (
        <Card
            title={
                <Input
                    placeholder="Search..."
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    prefix={<SearchOutlined />}
                />
            }
            className={`searchable-list${disabled ? ' disabled' : ''}`}
            style={{ width: 'auto' }}
            styles={{ body: { padding: '12px' }, header: { padding: '0px' } }}
            loading={loading}
            data-testid={testid}
            variant="borderless"
        >
            <Flex justify="space-between" align="center">
                {filteredOptions.length > 0 && (
                    <Checkbox
                        data-testid={`${testid}-select-all`}
                        checked={isAllSelected}
                        indeterminate={isIndeterminate}
                        onChange={(e) => toggleSelectAll(e.target.checked)}
                    >
                        <b>Select all</b>
                    </Checkbox>
                )}
                <span>{value?.length} selected</span>
            </Flex>

            <PerfectScrollbar
                data-testid={`${testid}-selection`}
                style={{ height: '200px' }}
            >
                <div
                    className="checkbox-list"
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: _spacing,
                        padding: '12px',
                    }}
                >
                    {filteredOptions.length === 0 ? (
                        <Empty />
                    ) : (
                        filteredOptions.map((option, index) => (
                            <Checkbox
                                data-testid={testid}
                                key={index}
                                disabled={option.disabled}
                                checked={value.includes(option.value)}
                                onChange={(e) =>
                                    toggleSingle(e.target.checked, option.value)
                                }
                            >
                                <Space style={{ padding: '2px' }}>
                                    {option.icon}
                                    <span data-testid="single-element">{option.label}</span>
                                </Space>
                            </Checkbox>
                        ))
                    )}
                </div>
            </PerfectScrollbar>
        </Card>
    );
};

export default memo(MultiSearchableList);
