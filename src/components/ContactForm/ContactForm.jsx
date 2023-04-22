import { useState } from 'react';
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import css from './ContactForm.module.css';

const ContactForm = ({ contacts, addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    e.currentTarget.name === 'name'
      ? setName(e.currentTarget.value)
      : setNumber(e.currentTarget.value);
  };

  const handleSubmit = e => {
    e.preventDefault();

    const contact = {
      id: nanoid(),
      name,
      number,
    };

    let isContact;
    contacts.forEach(newContact => {
      if (newContact.name.toLowerCase() === contact.name.toLowerCase()) {
        isContact = true;
        return;
      }
    });

    isContact
      ? alert(`${contact.name} is already in contacts!`)
      : addContact(contact);

    reset();
  };
  const reset = () => {
    setName('');
    setNumber('');
  };

  const numberId = nanoid();
  const nameId = nanoid();

  return (
    <div>
      <form onSubmit={handleSubmit} className={css.form}>
        <label className={css.label} htmlFor={nameId}>
          Name
        </label>
        <input
          onChange={handleChange}
          className={css.input}
          id={nameId}
          value={name}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
        <label className={css.label} htmlFor={numberId}>
          Number
        </label>
        <input
          onChange={handleChange}
          className={css.input}
          id={numberId}
          value={number}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  number: PropTypes.string,
  name: PropTypes.string,
  handleChange: PropTypes.func,
  addContact: PropTypes.func,
};

export default ContactForm;
