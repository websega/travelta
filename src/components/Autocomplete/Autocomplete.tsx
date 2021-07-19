import React, { useCallback, useRef, useState } from 'react';
import useOutsideClick from '../../hooks/useOutsideClick';

import { Cities } from '../../redux/reducers/locations';

import Dropdown from '../Dropdown';
import DropdownItem from '../Dropdown/DropdownItem/DropdownItem';
import TextBlock from '../TextBlock';
import TextField from '../TextField';

import './Autocomplete.scss';

type AutocompleteProps = {
  segmentId: string;
  fieldValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus: (e: React.FormEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
  onClickItem: (
    name: string,
    segmentId: string,
    code: string,
    fieldType: string
  ) => void;
  isOpen: boolean;
  locations: Cities[] | null;
  placeholder: string;
  fieldName: string;
  onSetFormikValue: (
    field: string,
    value: string,
    shouldValidate?: boolean
  ) => void;
  errorText: string | undefined;
  hasError: boolean;
};

const Autocomplete = ({
  segmentId,
  fieldValue,
  onChange,
  onFocus,
  onBlur,
  onClickItem,
  isOpen,
  locations,
  placeholder,
  fieldName,
  onSetFormikValue,
  errorText,
  hasError,
}: AutocompleteProps): JSX.Element => {
  const [activeSuggestion, setActiveSuggestion] = useState<number>(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleKeyDownCity = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (
        (e.code === 'ArrowUp' && activeSuggestion === 0) ||
        (e.code === 'ArrowDown' && activeSuggestion - 1 === locations?.length)
      ) {
        return;
      }

      if (e.code === 'ArrowUp') {
        setActiveSuggestion(activeSuggestion - 1);
      }

      if (e.code === 'ArrowDown') {
        setActiveSuggestion(activeSuggestion + 1);
      }

      if (e.code === 'Enter') {
        if (locations) {
          const { name, code } = locations[activeSuggestion];
          onClickItem(name, segmentId, code, fieldName);
          onSetFormikValue(`${fieldName}-${segmentId}`, name);
        }
        setActiveSuggestion(0);
      }
    },
    [
      activeSuggestion,
      fieldName,
      locations,
      onClickItem,
      onSetFormikValue,
      segmentId,
    ]
  );

  useOutsideClick(
    wrapperRef,
    () => {
      if (locations) {
        const { name, code } = locations[0];
        onClickItem(name, segmentId, code, fieldName);
        onSetFormikValue(`${fieldName}-${segmentId}`, name);
      }
    },
    isOpen
  );

  return (
    <div className="autocomplete" ref={wrapperRef}>
      <TextField
        id={`${fieldName}-${segmentId}`}
        value={fieldValue}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        errorText={errorText}
        hasError={hasError}
        onKeyDown={handleKeyDownCity}
      />
      {isOpen && (
        <Dropdown>
          {locations &&
            locations.map((row, i) => {
              const { id, name, code, country } = row;

              return (
                <DropdownItem
                  key={id}
                  hasHover
                  hasMargin
                  isActive={activeSuggestion === i}
                  onClick={() => {
                    onClickItem(name, segmentId, code, fieldName);
                    onSetFormikValue(`${fieldName}-${segmentId}`, name);
                  }}
                >
                  <TextBlock text={`${name}, ${country}`} />
                </DropdownItem>
              );
            })}
        </Dropdown>
      )}
    </div>
  );
};

export default Autocomplete;
