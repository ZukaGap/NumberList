import React, { useState } from "react";
import { Form, Input, Tooltip, Select, Button } from "antd";
import { QuestionCircleOutlined, SendOutlined } from "@ant-design/icons";
import * as db from "./data";
import "./AddContact.css";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

export default function RegistrationForm({ close, handleAddContact }) {
  const [form] = Form.useForm();
  const [phone, setPhone] = useState(null);

  const onFinish = (values) => {
    const data = {
      ...values,
      id: Date.now(),
    };
    console.log("Received values of form: ", data);
    db.addContact(data);
    handleAddContact(data);
    close();
  };

  const prefixSelector = (
    <Select defaultValue="995" name="prefix" style={{ width: 75 }}>
      <Option value="995">+995</Option>
    </Select>
  );

  const checkPhone = () => {
    try {
      if (phone.length === 9) {
        alert(phone);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="addform">
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          residence: ["Georgia"],
          prefix: "995",
        }}
        scrollToFirstError
      >
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="name"
          label={
            <span>
              Name&nbsp;
              <Tooltip title="What do you want others to call you?">
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          }
          rules={[
            {
              required: true,
              message: "Please input your Name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (value.length === 9) {
                  return Promise.resolve();
                } else if (
                  (value.length >= 9 || value.length <= 9) &&
                  value.length !== 0
                )
                  return Promise.reject("Place enter correct Phone Number!");
              },
            }),
          ]}
        >
          <Input
            type="number"
            addonBefore={prefixSelector}
            addonAfter={<SendOutlined onClick={checkPhone} />}
            onChange={(event) => setPhone(event.target.value)}
            value={phone}
            style={{ width: "100%" }}
            allowClear={true}
          />
        </Form.Item>

        <div className="buttons">
          <Form.Item>
            <Button
              type="button"
              className="btn btn-secondary"
              onClick={() => close()}
            >
              დახურვა
            </Button>
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              დამატება
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
