import React, { useState, useEffect } from "react";
import Header from "./Header";
import ContactList from "./contact-list/ContactList";
import AddContact from "./AddContact";
import Search from "./search/Search";
import * as db from "./data";
import "./App.css";
import { Empty } from "antd";

export default function App() {
  const [contacts, setContacts] = useState(db.getContacts());
  const [searchValue, setSearchValue] = useState("");
  const [addForm, setAddForm] = useState(false);

  useEffect(() => {
    const data = db
      .getContacts()
      .filter((contact) =>
        contact.name.toUpperCase().includes(searchValue.toUpperCase())
      );
    setContacts(data);
  }, [searchValue]);

  // const handleClick = (id) => {
  //   const contactData = this.state.contacts.filter((x) => x.id !== id);
  //   this.setState({ contacts: contactData });
  // };

  const handleSearch = (event) => {
    const NewData = contacts.filter((x) =>
      x.name.toUpperCase().includes(event.target.value.toUpperCase())
    );
    setSearchValue(event.target.value);
    setContacts(NewData);
  };

  const handleRemoveContact = ({ id }) => {
    const newList = contacts.filter((item) => item.id !== id);
    setContacts(newList);
    localStorage.setItem("contacts", JSON.stringify(newList));
  };

  const handleEditContact = ({ id, email, phone, name }) => {
    const newList = contacts
      .filter((item) => item.id !== id)
      .concat({ id, email, phone, name });
    setContacts(newList);
    localStorage.setItem("contacts", JSON.stringify(newList));
  };

  return (
    <>
      <Header />
      {!addForm ? (
        <Search
          searchValue={searchValue}
          showAddForm={() => setAddForm(true)}
          handleSearch={(e) => setSearchValue(e.target.value)}
        />
      ) : (
        ""
      )}
      {addForm ? (
        <AddContact
          close={() => setAddForm(false)}
          handleAddContact={(contact) =>
            setContacts((prev) => [...prev, contact])
          }
        />
      ) : contacts.length === 0 ? (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
        />
      ) : (
        <ContactList
          contacts={contacts}
          handleRemoveContact={handleRemoveContact}
          handleEditContact={handleEditContact}
        />
      )}
    </>
  );
}
