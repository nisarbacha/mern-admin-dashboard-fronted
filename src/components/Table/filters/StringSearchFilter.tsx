import { Form, Input, Space, Button, Radio, type FormProps, Card, Row, Flex } from 'antd'


import React from 'react'
import type { $option } from '../../../types/interface/option.interface'
import type { IFilter } from '../../../types/interface/table.interface'
import { NUMBER_OPTIONS, STRING_OPTIONS, type TSupportedConditions } from '../../../constant/table.constant'
import { useFilterStore } from '../../../store'

// import { convert2label } from 'utils/strings'

interface IProps {
    field: string
    label?: string
    addFilterLableProps?: boolean
    onFinish: (values: IFilter) => void
    type?: 'String' | 'Number'
    options?: $option[]
}
type StringOrNumberFormValues = {
    condition: TSupportedConditions;
    value?: string; // ⬅️ changed from string[] to string
};
const StringOrNumberFilter: React.FC<IProps> = ({
    field,
    label = field, //convert2label(field),
    addFilterLableProps,
    onFinish,
    type,
    options,
}) => {
    const [form] = Form.useForm<StringOrNumberFormValues>();

    const OPTIONS = options?.length ? options : type === 'Number' ? NUMBER_OPTIONS : STRING_OPTIONS
    // const selectedCondition = Form.useWatch('condition', form);

    const _onFinish: FormProps<StringOrNumberFormValues>['onFinish'] = (values) => {

        const filter: IFilter = {
            field,
            label,
            condition: values.condition,
            value: values.value,
        };

        useFilterStore.getState().setFilter(filter);
        onFinish?.(filter);
    };


    return (
        <Card style={{ width: 300 }} variant="borderless" hoverable>
            <Form
                form={form}
                autoComplete="off"
                onFinish={_onFinish}
                initialValues={{
                    condition: OPTIONS[0].value,
                }}
                layout="vertical"
                data-testid={field}
            >
                <Form.Item
                    name="value"
                    label={<strong>{'Search term'}</strong>}
                    rules={[
                        {
                            required: true,
                            message: 'Form required',
                        },
                    ]}
                >
                    <Input
                        size="middle"
                        style={{ display: 'block' }}
                        placeholder={'Search'}
                        autoFocus
                        type={type === 'Number' ? 'number' : 'text'}
                    />
                </Form.Item>

                <Form.Item
                    name="condition"
                    rules={[{ required: true, message: 'Form required' }]}
                    label={<b>{'Action'}</b>}
                >
                    <Radio.Group>
                        <Space direction="vertical">
                            {OPTIONS.map((r) => (
                                <Radio key={r.value} style={{ display: 'block', marginLeft: 2 }} value={r.value}>
                                    <span data-testid="filter-element">{r.label}</span>
                                </Radio>
                            ))}
                        </Space>
                    </Radio.Group>
                </Form.Item>

                <Form.Item noStyle className="form-actions">
                    <Flex justify="end" align="baseline" style={{
                        marginTop: '10px'
                    }} >
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
    )
}

export default StringOrNumberFilter
