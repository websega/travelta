import React from 'react';
import { useSelector } from 'react-redux';

import useInput from '../../../hooks/useInput';
import { RootStateType } from '../../../redux/reducers';

import SwitchButton from '../../SwitchButton';
import TextInput from '../../TextInput';
import PassangerSelector from '../../PassangerSelector';
import SimpleButton from '../../SimpleButton';
import Datepicker from '../../Datepicker';

import './AviaStandartForm.scss';

const AviaStandartForm = (): JSX.Element => {
  const origin = useInput('');
  const destination = useInput('');

  const segments = useSelector(
    (state: RootStateType) => state.aviaParams.segments
  );

  return (
    <form className="search-form">
      {segments.map((segment) => {
        const { id } = segment;

        return (
          <>
            <div className="search-form__origin">
              <TextInput
                placeholder="Откуда"
                id={`origin-${id}`}
                value={origin.value}
                onChange={origin.onChange}
              />
              <SwitchButton />
            </div>

            <div className="search-form__destination">
              <TextInput
                placeholder="Куда"
                id={`destination=${id}`}
                value={destination.value}
                onChange={destination.onChange}
              />
            </div>

            <div className="search-form__datepicker">
              <Datepicker segment={segment} />
            </div>
          </>
        );
      })}

      <div className="search-form__select">
        <PassangerSelector />
      </div>

      <div className="search-form__search-btn">
        <SimpleButton submit accent title="Найти" />
      </div>
    </form>
  );
};

export default AviaStandartForm;
