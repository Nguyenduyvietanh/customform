import React, { useEffect, useRef, useState } from 'react'
import { Form, Input, Button, Select, Modal, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const data = [
    { name: 'Văn bản ngắn', type: 'text' },
    { name: 'Văn bản dài', type: 'textarea' },
    { name: 'Email', type: 'email' },
    { name: 'Số', type: 'number' },
    { name: 'Select', type: 'select' },
    { name: 'Radio', type: 'radio' },
    { name: 'CheckBox', type: 'checkbox' }

]
const useResetFormOnCloseModal = ({ form, visible }) => {
    const prevVisibleRef = useRef();
    useEffect(() => {
        prevVisibleRef.current = visible;
    }, [visible]);
    const prevVisible = prevVisibleRef.current;
    useEffect(() => {
        if (!visible && prevVisible) {
            form.resetFields();
        }
    }, [visible]);
};
const ModalForm = ({ visible, onCancel, listField, setListField }) => {
    const [form] = Form.useForm();
    const [typeSelect, setTypeSelect] = useState('');

    useResetFormOnCloseModal({
        form,
        visible,
    });

    const onOk = () => {
        form.submit();
        const newField = { ...form.getFieldsValue() };
        const newListField = [...listField, newField];
        setListField(newListField);
    };

    const { Option } = Select;
    function onChange(value) {
        setTypeSelect(value);
        // console.log(`selected ${value}`);
    }

    function onBlur() {
        // console.log('blur');
    }

    function onFocus() {
        // console.log('focus');
    }

    function onSearch(val) {
        // console.log('search:', val);
    }

    const renderContentForm = (type) => {
        if (type === "text" || type === "textarea" || type === "number" || type === "email") {
            return <>
                <Form.Item
                    name="name"
                    label="Key field"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="label"
                    label="Name field"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item></>
        }
        if (type === "select") {
            return <>
                <Form.Item
                    name="name"
                    label="Key field"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="label"
                    label="Name field"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.List name="optional">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'label']}
                                        fieldKey={[fieldKey, 'label']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="Tên Option" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        fieldKey={[fieldKey, 'value']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
                                    >
                                        <Input placeholder="Key Option" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Option
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

            </>
        }
        if (type === 'checkbox') {
            return <>
                <Form.Item
                    name="name"
                    label="Key field"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="label"
                    label="Name field"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.List name="checkbox">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'label']}
                                        fieldKey={[fieldKey, 'label']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="Tên checkbox" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        fieldKey={[fieldKey, 'value']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
                                    >
                                        <Input placeholder="Key checkbox" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Checkbox
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

            </>
        }
        if (type === 'radio') {
            return <>
                <Form.Item
                    name="name"
                    label="Key field"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="label"
                    label="Name field"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.List name="radio">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, fieldKey, ...restField }) => (
                                <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'label']}
                                        fieldKey={[fieldKey, 'label']}
                                        rules={[{ required: true, message: 'Missing first name' }]}
                                    >
                                        <Input placeholder="Tên radio" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        fieldKey={[fieldKey, 'value']}
                                        rules={[{ required: true, message: 'Missing last name' }]}
                                    >
                                        <Input placeholder="Key radio" />
                                    </Form.Item>
                                    <MinusCircleOutlined onClick={() => remove(name)} />
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add Radio
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

            </>
        }
    }

    return (
        <Modal title="Thêm thông tin" visible={visible} onOk={onOk} onCancel={onCancel}>
            <Form form={form} layout="vertical" name="userForm">
                <Form.Item
                    name="type"
                    label="select type"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Select
                        showSearch
                        style={{ width: 200 }}
                        placeholder="Chọn type"
                        optionFilterProp="children"
                        onChange={onChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        onSearch={onSearch}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {data.map(item => {
                            return <Option value={item.type}>{item.name}</Option>

                        })}

                    </Select>
                </Form.Item>
                {renderContentForm(typeSelect)}

            </Form>
        </Modal>
    );
};
export default ModalForm;