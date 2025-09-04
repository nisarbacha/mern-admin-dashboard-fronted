
import { Card, Empty, Input, Radio, } from 'antd';
import { memo, useState, type FC, } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import type { $option } from '../../types/interface/option.interface';
import { SearchOutlined } from '@ant-design/icons';

interface IProps {
    spacing?: 'small' | 'medium' | 'large'
    value?: string// controlled value from Form.Item
    onChange?: (v: string) => void // update form value
    defaultValues?: string[]
    options: $option[] | undefined
    minHeight?: string
    disabled?: boolean
    loading?: boolean
    testid?: string
    label?: string
}
const style: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
};
const SingleSearchableList: FC<IProps> = ({
    options = [], 
    onChange,
    spacing = 'small',
    loading,
    testid = 'multi-search',
    disabled,
}) => {
    const [term, setTerm] = useState<string>('');

    const _spacing = spacing === 'small' ? 4 : spacing === 'large' ? 16 : 8;

    const handleChange = (newSelected: string) => {
        onChange?.(newSelected);
    };

    const toggleSingle = (optionValue: string) => {
        handleChange(optionValue);
    };

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
                    {options.length === 0 ? (
                        <Empty />
                    ) : (
                        <Radio.Group
                            data-testid={testid}
                            style={style}
                            // disabled={option.disabled}
                            options={options}
                            onChange={(e) =>
                                toggleSingle(e.target.value)
                            }
                        />
                    )}
                </div>
            </PerfectScrollbar>
        </Card>
    );
};

export default memo(SingleSearchableList);
