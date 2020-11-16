import React, { useState } from "react";
import "./ContactListItem.css";
import {
  ExclamationCircleOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { Modal, Input, Tag, Button } from "antd";

const { confirm } = Modal;

function ContactListItem({
  contact,
  contact: { name },
  removeContact,
  editContact,
}) {
  const [visible, setVisible] = useState(false);
  const [contactName, setContactName] = useState(name);
  const [email, setEmail] = useState(contact.email);
  const [phone, setPhone] = useState(contact.phone);

  const handleOk = () => {
    const changed = {
      id: contact.id,
      name: contactName,
      phone,
      email,
    };
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
      <div className="card-body">
        {name}
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
        <Modal
          title="რედაქტირება"
          visible={visible}
          onOk={handleOk}
          onCancel={() => setVisible(false)}
          footer={[
            <Tag color="green">ID:{contact.id}</Tag>,
            <Button key="back" onClick={() => setVisible(false)}>
              გაუქმება
            </Button>,
            <Button key="submit" type="primary" onClick={handleOk} danger>
              შეცვლა
            </Button>,
          ]}
        >
          <Input
            className="mt-2"
            placeholder="დასახელება"
            prefix={<UserOutlined />}
            value={contactName}
            onChange={(e) => setContactName(e.target.value)}
          />
          <Input
            className="mt-2"
            placeholder="ტელეფონი"
            prefix={<PhoneOutlined />}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Input
            className="mt-2"
            placeholder="ელ.ფოსტა"
            prefix={<MailOutlined />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Modal>
      </div>
    </div>
  );
}

export default ContactListItem;
