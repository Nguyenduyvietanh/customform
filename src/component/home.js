import React, { useState } from 'react'
import { Form, Input, InputNumber, Button, Select, Checkbox, Row, Col, Radio } from 'antd';

import ModalForm from './modal';
const listFieldInit = [
    { name: 'name', label: 'Họ và tên', type: 'text' },
    { name: 'email', label: 'Email', type: 'email' },
    { name: 'age', label: 'Tuổi', type: 'number' },
    { name: 'gender', label: 'Giới tính', type: 'select', optional: [{ label: 'Nam', value: 'male' }, { label: 'Nữ', value: 'female' }, { label: 'Khác', value: 'other' }] },
    { name: 'hobby', label: 'Sở thích', type: 'checkbox', checkbox: [{ label: 'Đá bóng', value: 'dabong' }, { label: 'Cầu Lông', value: 'caulong' }, { label: 'Play Girl', value: 'playgirl' }, { label: 'Phá đò', value: 'phado' }] },
    { name: 'Tienan', label: 'Tiền án tiền sự', type: 'radio', radio: [{ label: 'Đã từng đi tù', value: 'daditu' }, { label: 'Chưa từng đi tù', value: 'chuaditu' }, { label: 'Chuẩn bị vào tù', value: 'cbivaotu' }] },
    { name: 'contact', label: 'Liên Hệ', type: 'textarea' },
];

const Home = () => {
    const [visible, setVisible] = useState(false);

    const showUserModal = () => {
        setVisible(true);
    };

    const hideUserModal = () => {
        setVisible(false);
    };
    const [listField, setListField] = useState(listFieldInit);
    const { Option } = Select;
    const layout = {
        labelCol: {
            span: 8,
        },
        wrapperCol: {
            span: 7,
        },
    };
    const validateMessages = {
        required: '${label} không được để trống!',
        types: {
            email: '${label} không đúng định dạng',
            number: 'Bạn phải nhập số',
        },
        number: {
            range: '${label} phải là số dương ',
        },
    };
    const onFinish = (values) => {
        console.log(values);
    };

    // const onAddField = () => {
    //     SetListField([...listField, { name: 'ok', label: 'ok chua', type: 'text', required: true }]);
    // };

    return (
        <>
            <Form.Provider
                onFormFinish={(name, { values, forms }) => {
                    if (name === 'userForm') {
                        const { basicForm } = forms;
                        const users = basicForm.getFieldValue('users') || [];
                        basicForm.setFieldsValue({
                            users: [...users, values],
                        });
                        setVisible(false);
                    }
                }}
            >
                <Form {...layout} name="basicForm" onFinish={onFinish} validateMessages={validateMessages} style={{ marginTop: 100 }}>
                    {listField.map((item, index) => {
                        if (item.type === 'text') {
                            return <Form.Item
                                name={item.name}
                                label={item.label}
                                key={index}

                            >
                                <Input />
                            </Form.Item>
                        } else if (item.type === 'email') {
                            return <Form.Item
                                name={item.name}
                                label={item.label}
                                key={index}
                                rules={
                                    [
                                        {
                                            type: item.type,
                                        },
                                    ]}
                            >
                                <Input />
                            </Form.Item>
                        } else if (item.type === 'number') {
                            return <Form.Item
                                name={item.name}
                                label={item.label}
                                key={index}
                                rules={[
                                    {
                                        type: item.type,
                                        min: 0,
                                    },
                                ]}
                            >
                                <InputNumber />
                            </Form.Item>
                        } else if (item.type === 'select') {
                            return <Form.Item
                                name={item.name}
                                label={item.label}
                                key={index}
                                rules={[
                                    {
                                        required: item.required,
                                    },
                                ]}
                            >
                                <Select placeholder="Chọn ">

                                    {item.optional.map(itemSelect => {
                                        return <Option value={itemSelect.value}>{itemSelect.label}</Option>

                                    })}
                                </Select>
                            </Form.Item>
                        } else if (item.type === 'textarea') {
                            return <Form.Item
                                name={item.name}
                                label={item.label}
                                key={index}
                            >
                                <Input.TextArea />
                            </Form.Item>
                        } else if (item.type === 'checkbox') {
                            return <Form.Item
                                name={item.name}
                                label={item.label}
                                key={index}
                            >
                                <Checkbox.Group style={{ width: '100%' }} >
                                    <Row>
                                        {item.checkbox.map(itemcheck => {
                                            return <Col span={8}>
                                                <Checkbox style={{ lineHeight: '40px', }} value={itemcheck.value}>{itemcheck.label}</Checkbox>
                                            </Col>
                                        })}

                                    </Row>
                                </Checkbox.Group>
                            </Form.Item>
                        } else if (item.type === 'radio') {
                            return <Form.Item name={item.name} label={item.label} key={index}>
                                <Radio.Group>
                                    {item.radio.map(itemradio => {
                                        return <Radio value={itemradio.value}>{itemradio.label}</Radio>
                                    })}
                                </Radio.Group>
                            </Form.Item>
                        }
                    })}

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
                        <Button type="#7c3118" onClick={showUserModal} >
                            + Add Field
                        </Button>
                    </Form.Item>
                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <ModalForm visible={visible} onCancel={hideUserModal} setListField={setListField} listField={listField} />
            </Form.Provider>

        </>
    )
}

export default Home;
