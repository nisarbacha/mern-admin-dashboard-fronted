import type { FormProps, SelectProps } from 'antd';
import { Button, Card, Flex, Form, Radio, Space } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import React from 'react';

import MultiSearchableList from '../../searchable-list/MultiSearchableList';
import {
    MULTI_SELECT_OPTIONS,
    SUPPORTED_CONDITIONS,
    type TSupportedConditions,
} from '../../../constant/table.constant';
import type { $option } from '../../../types/interface/option.interface';
import type { IFilter } from '../../../types/interface/table.interface';
import { useFilterStore } from '../../../store';

interface MultiSelectFilterProps extends SelectProps<string[], DefaultOptionType> {
    field: string;
    label?: string;
    options: $option[];
    onFinish: (filter: IFilter) => void;
    disabledConditions?: TSupportedConditions[];
    defaultCondition?: TSupportedConditions;
    resetOnFinish?: boolean;
}

type MultiSelectFormValues = {
    condition: TSupportedConditions;
    value?: string[];
};

const MultiSelectionFilter: React.FC<MultiSelectFilterProps> = ({
    field,
    label,
    options = [],
    onFinish,
    resetOnFinish = false,
    defaultCondition = SUPPORTED_CONDITIONS.in,
    disabledConditions,
}) => {
    const [form] = Form.useForm<MultiSelectFormValues>();
    const selectedCondition = Form.useWatch('condition', form);

    const _onFinish: FormProps<MultiSelectFormValues>['onFinish'] = (values) => {
        if (resetOnFinish) {
            form.resetFields();
        }

        const filter: IFilter = {
            field,
            label,
            condition: values.condition,
            value: (values.value || []).map((v) => encodeURIComponent(v)),
        };
        console.log('filter--', filter)
        useFilterStore.getState().setFilter(filter);
        onFinish?.(filter);
    };

    const onFinishFailed: FormProps<MultiSelectFormValues>['onFinishFailed'] = (errorInfo) => {
        console.warn('Filter form validation failed:', errorInfo);
    };

    return (
        <Card style={{ width: 300 }} variant="borderless" hoverable>
            <Form
                form={form}
                name="multi-filter"
                initialValues={{ condition: defaultCondition }}
                onFinish={_onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    name="condition"
                    noStyle
                    rules={[{ required: true, message: 'Please select a condition!' }]}
                >
                    <Radio.Group
                        block
                        options={MULTI_SELECT_OPTIONS.map((opt) => ({
                            ...opt,
                            disabled: disabledConditions?.includes(opt.value),
                        }))}
                        optionType="button"
                    />
                </Form.Item>
                <Form.Item
                    noStyle
                    name="value"
                    valuePropName="value"
                    rules={
                        ([SUPPORTED_CONDITIONS.null, SUPPORTED_CONDITIONS.notNull] as TSupportedConditions[]).includes(selectedCondition)
                            ? []
                            : [{ required: true, message: 'Please select at least one option!' }]
                    }
                >
                    <MultiSearchableList options={options} />
                </Form.Item>

                <Form.Item noStyle className="form-actions" >
                    <Flex justify="end" align="baseline" style={{
                        marginTop: 10
                    }}>
                        <Space>
                            <Button data-testid="reset-filter" htmlType="reset" onClick={() => form.resetFields()}>
                                <span className="primary">Reset</span>
                            </Button>
                            <Button data-testid="submit-filter" htmlType="submit" type="primary">
                                Add filter
                            </Button>
                        </Space>
                    </Flex>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default MultiSelectionFilter;
