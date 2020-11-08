import React from 'react'
import Header from './Header'
import ContactList from './contact-list/ContactList'
import AddContact from './AddContact'
import Search from './search/Search'
import * as db from './data'
import './App.css'

class App extends React.Component {
  state = {
    contacts: null,
    isEnable: true,
    searchValue: '',
    addForm: false,
  }

  componentDidMount() {
    const data = db.getContacts()
    this.setState({ contacts: data })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchValue !== this.state.searchValue) {
      const data = db
        .getContacts()
        .filter((contact) =>
          contact.name
            .toUpperCase()
            .includes(this.state.searchValue.toUpperCase())
        )
      this.setState({ contacts: data })
    }
  }

  handleClick = (id) => {
    const contactData = this.state.contacts.filter((x) => x.id !== id)
    this.setState({ contacts: contactData })
  }

  handleSearch = (event) => {
    const contacts = contacts.filter((x) =>
      x.name.toUpperCase().includes(event.target.value.toUpperCase())
    )
    this.setState({
      searchValue: event.target.value,
      contacts,
    })
  }

  handleClose = () => {
    this.setState({ addForm: false })
  }

  handleRemoveContact = ({id}) => {
    const newList = this.state.contacts.filter((item) => item.id !== id)
    this.setState({contacts: newList})
    localStorage.setItem('contacts', JSON.stringify(newList))
  }

  handleEditContact = ({id, email, phone, name}) => {
    const newList = this.state.contacts.filter((item) => item.id !== id).concat({id, email, phone, name});
    this.setState({contacts: newList})
    localStorage.setItem('contacts', JSON.stringify(newList))
  }

  hendleShowAddForm = () => {
    this.setState({ addForm: true })
  }

  handleAddContact = (contact) => {
    this.setState({ contacts: [...this.state.contacts, contact] })
  }

  onSearch = (e) => {
    this.setState({ searchValue: e.target.value })
  }

  render() {
    return (
      <>
        <Header />
        <Search
          searchValue={this.state.searchValue}
          showAddForm={this.hendleShowAddForm}
          handleSearch={this.onSearch}
        />
        {this.state.addForm ? (
          <AddContact
            close={this.handleClose}
            handleAddContact={this.handleAddContact}
          />
        ) : (
          <ContactList
            contacts={this.state.contacts}
            handleRemoveContact={this.handleRemoveContact}
            handleEditContact={this.handleEditContact}
          />
        )}
      </>
    )
  }
}
export default App
