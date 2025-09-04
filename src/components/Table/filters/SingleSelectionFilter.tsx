import type { FormProps, SelectProps } from 'antd';
import { Button, Card, Flex, Form, Radio, Space } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import React from 'react';
import {
    SINGLE_SELECT_OPTIONS,
    SUPPORTED_CONDITIONS,
    type TSupportedConditions,
} from '../../../constant/table.constant';
import type { $option } from '../../../types/interface/option.interface';
import type { IFilter } from '../../../types/interface/table.interface';
import { useFilterStore } from '../../../store';
import SingleSearchableList from '../../searchable-list/SingleSearchableList';

interface SingleSelectionFilterProps extends SelectProps<string[], DefaultOptionType> {
    field: string;
    label?: string;
    options: $option[];
    onFinish: (filter: IFilter) => void;
    disabledConditions?: TSupportedConditions[];
    defaultCondition?: TSupportedConditions;
    resetOnFinish?: boolean;
}

type SingleSelectFormValues = {
    condition: TSupportedConditions;
    value?: string; // ⬅️ changed from string[] to string
};

const SingleSelectionFilter: React.FC<SingleSelectionFilterProps> = ({
    field,
    label,
    options = [],
    onFinish,
    resetOnFinish = false,
    defaultCondition = SUPPORTED_CONDITIONS.equals,
}) => {
    const [form] = Form.useForm<SingleSelectFormValues>();
    // const selectedCondition = Form.useWatch('condition', form);

    const _onFinish: FormProps<SingleSelectFormValues>['onFinish'] = (values) => {
        if (resetOnFinish) {
            form.resetFields();
        }

        const filter: IFilter = {
            field,
            label,
            condition: values.condition,
            value: values.value,
        };

        useFilterStore.getState().setFilter(filter);
        onFinish?.(filter);
    };

    const onFinishFailed: FormProps<SingleSelectFormValues>['onFinishFailed'] = (errorInfo) => {
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
                        options={SINGLE_SELECT_OPTIONS}
                        optionType="button"
                    />
                </Form.Item>
                <Form.Item
                    noStyle
                    name="value"
                    valuePropName="value"
                    rules={[{ required: true, message: 'Please select at least one option!' }]}
                >
                    <SingleSearchableList options={options} />
                </Form.Item>

                <Form.Item noStyle className="form-actions">
                    <Flex justify="end" align="baseline" style={{
                        marginTop: '10px'
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

export default SingleSelectionFilter;
