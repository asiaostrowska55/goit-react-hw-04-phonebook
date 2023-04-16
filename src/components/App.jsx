import { Component } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export class App extends Component {
  STORAGE_KEY = 'phonebook';
  state = {
    contacts: [],
    filter: '',
  };

  //local Storage
  componentDidMount() {
    const storageContacts = localStorage.getItem(this.STORAGE_KEY);

    if (storageContacts) {
      this.setState({ contacts: JSON.parse(storageContacts) });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.contacts !== this.state.contacts) {
      localStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addNewContact = contact => {
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  filter = el => {
    this.setState({
      filter: el.currentTarget.value,
    });
  };

  filterName = () => {
    const { filter, contacts } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.filterName();
    const { contacts } = this.state;
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm contacts={contacts} addContact={this.addNewContact} />

        <h2>Contacts</h2>
        <Filter filtered={this.filter} />
        <ContactList
          contacts={filteredContacts}
          removeContact={this.deleteContact}
        />
      </div>
    );
  }
}
