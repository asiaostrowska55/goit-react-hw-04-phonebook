import { useEffect, useState } from 'react';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter/Filter';

export const App = () => {
  const STORAGE_KEY = 'phonebook';
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  //local Storage
  useEffect(() => {
    const storageContacts = localStorage.getItem(STORAGE_KEY);

    if (storageContacts) {
      setContacts(JSON.parse(storageContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addNewContact = newContact => {
    setContacts([...contacts, newContact]);
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  const filtered = el => {
    setFilter(el.currentTarget.value);
  };

  const filterName = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm contacts={contacts} addContact={addNewContact} />

      <h2>Contacts</h2>
      <Filter filtered={filtered} />
      <ContactList contacts={filterName()} removeContact={deleteContact} />
    </div>
  );
};
