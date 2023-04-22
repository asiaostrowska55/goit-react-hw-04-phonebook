import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import css from './Filter.module.css';

const Filter = ({ filtered }) => {
  const filterId = nanoid();

  return (
    <div>
      <p htmlFor={filterId} className={css.filter}>
        Find contacts by name
      </p>
      <input
        className={css.input}
        type="search"
        id={filterId}
        onChange={filtered}
      ></input>
    </div>
  );
};

Filter.propTypes = {
  filtered: PropTypes.func,
  value: PropTypes.string,
};

export default Filter;
