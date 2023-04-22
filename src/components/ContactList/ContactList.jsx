import PropTypes from 'prop-types';
import css from './ContactList.module.css';

const ContactList = ({ contacts, removeContact }) => {
  const listItem = contacts.map(item => {
    return (
      <li key={item.id} id={item.id} className={css.element}>
        {item.name}: {item.number}
        <button
          className={css.btn}
          onClick={() => removeContact(item.id)}
          type="button"
        >
          Delete
        </button>
      </li>
    );
  });
  return <ul className={css.listItem}>{listItem}</ul>;
};

ContactList.propTypes = {
  contacts: PropTypes.array,
  removeContact: PropTypes.func,
};
export default ContactList;
