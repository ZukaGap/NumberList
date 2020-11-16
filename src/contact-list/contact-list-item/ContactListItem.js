import React, { useState, useEffect } from "react";
import "./ContactListItem.css";
import {
  ExclamationCircleOutlined,
  QuestionCircleOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { Form, Modal, Input, Tooltip, Select, Button } from "antd";

const { confirm } = Modal;
const { Option } = Select;

function ContactListItem({ contact, removeContact, editContact }) {
  const [visible, setVisible] = useState(false);
  const [contactName, setContactName] = useState(contact.name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);
  const [form] = Form.useForm();

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

  const handleOk = (value) => {
    const changed = {
      id: contact.id,
      name: value.name,
      phone: value.phone,
      email: value.email,
    };
    setContactName(value.name);
    setEmail(value.email);
    setPhone(value.phone);
    editContact(changed);
    setVisible(false);
  };

  const showDeleteConfirm = () => {
    confirm({
      title: "ნამდვილად გსურთ წაშალოთ კონტაქტი ?",
      icon: <ExclamationCircleOutlined />,
      okText: "დიახ",
      okType: "danger",
      cancelText: "არა",
      onOk() {
        removeContact(contact);
      },
    });
  };

  return (
    <div className="card mt-3">
      <div className="card-body item">
        <p>{contactName}</p>
        <p>{email}</p>
        <p>{phone}</p>
        <div>
          <button
            className="btn btn-danger float-right"
            onClick={showDeleteConfirm}
          >
            X
          </button>
          <button
            className="btn mr-2 btn-warning float-right"
            onClick={() => setVisible(true)}
          >
            Edit
          </button>
        </div>
        <Modal
          title="რედაქტირება"
          visible={visible}
          onOk={handleOk}
          onCancel={() => setVisible(false)}
          footer={""}
        >
          <Form
            form={form}
            name="register"
            onFinish={handleOk}
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
              <Input defaultValue={email} />
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
              <Input defaultValue={contactName} />
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
                      return Promise.reject(
                        "Place enter correct Phone Number!"
                      );
                  },
                }),
              ]}
            >
              <Input
                type="number"
                addonBefore={prefixSelector}
                addonAfter={<SendOutlined onClick={checkPhone} />}
                style={{ width: "100%" }}
                allowClear={true}
                defaultValue={phone}
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                დამატება
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
}

export default ContactListItem;
