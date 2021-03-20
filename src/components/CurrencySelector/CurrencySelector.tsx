import React, { useCallback, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { InitialSettingsStateType } from '../../redux/reducers/settings';
import { setCurrency } from '../../redux/actions/settings/settings';

import useOutsideClick from '../../hooks/useOutsideClick';

import Dropdown from '../Dropdown';
import DropdownList from '../Dropdown/DropdownList';

import './CurrencySelector.scss';

const currencyList = [
  { label: 'RUB', name: 'Рубли' },
  { label: 'EUR', name: 'Евро' },
  { label: 'USD', name: 'Доллары' },
];

type StateType = {
  settings: InitialSettingsStateType;
};

const CurrencySelector = (): JSX.Element => {
  const dispatch = useDispatch();
  const currency = useSelector(({ settings }: StateType) => settings.currency);
  const [isOpen, setOpen] = useState<boolean>(false);

  const wrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(wrapperRef, () => setOpen(false), isOpen);

  const toggleDropdownMenu = () => {
    setOpen(!isOpen);
  };

  const handleClickDropdownList = useCallback(
    (value: string) => {
      dispatch(setCurrency(value));
    },
    [dispatch]
  );

  return (
    <div ref={wrapperRef} className="currency-selector">
      <button
        type="button"
        className="currency-selector__btn"
        onClick={toggleDropdownMenu}
      >
        <span>{currency}</span>
      </button>

      {isOpen && (
        <Dropdown>
          <DropdownList
            items={currencyList}
            onClick={handleClickDropdownList}
            currentValue={currency}
          />
        </Dropdown>
      )}
    </div>
  );
};

export default CurrencySelector;