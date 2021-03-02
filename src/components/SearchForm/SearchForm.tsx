import React from 'react';

import './SearchForm.scss';

const SearchForm = (): JSX.Element => {
  return (
    <form className="search-form">
      <label htmlFor="origin" className="search-form__label">
        <input
          id="origin"
          type="text"
          placeholder="Откуда"
          className="search-form__input search-form__input--origin"
        />
      </label>

      <label htmlFor="destination" className="search-form__label ">
        <input
          id="destination"
          type="text"
          placeholder="Куда"
          className="search-form__input search-form__input--destination"
        />
      </label>

      <label htmlFor="depart" className="search-form__label ">
        <input
          id="depart"
          type="date"
          placeholder="Отправление"
          className="search-form__input search-form__input--depart"
        />
      </label>

      <label htmlFor="return" className="search-form__label ">
        <input
          id="return"
          type="date"
          placeholder="Прибытие"
          className="search-form__input search-form__input--return"
        />
      </label>

      <div className="search-form__select">select</div>

      <button type="submit" className="search-form__button">
        Найти
      </button>
    </form>
  );
};

export default SearchForm;
