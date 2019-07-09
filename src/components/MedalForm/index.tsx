import React, { ChangeEvent, FormEvent, useState } from 'react';

interface IMedalData {
  country: string;
  gold: string;
  silver: string;
  bronze: string;
}

interface ICountryMedal {
  country: string;
  medals: {
    gold: number;
    silver: number;
    bronze: number;
  };
}

interface IFormProps {
  onSave(values: any): void;
}

const INITIAL_STATE: IMedalData = {
  country: '',
  gold: '',
  silver: '',
  bronze: ''
};

const Form = ({ onSave }: IFormProps): JSX.Element => {
  const [values, setValues] = useState<IMedalData>(INITIAL_STATE);
  const { country, gold, silver, bronze } = values;

  const onChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();

    const medals = {
      gold: Number(gold),
      silver: Number(silver),
      bronze: Number(bronze)
    };

    const newCountry = { country, medals };

    if (!country || !gold || !silver || !bronze) {
      return;
    }

    onSave(newCountry);
    setValues(INITIAL_STATE);
  };

  return (
    <div className="medals-form">
      <form autoComplete="false" onSubmit={onSubmit}>
        <input
          className="medals-form__input__country"
          name="country"
          autoComplete="new-false"
          placeholder="Country"
          type="text"
          value={country}
          onChange={onChange}
        />
        <input
          className="medals-form__input__medal"
          name="gold"
          autoComplete="off"
          type="number"
          placeholder="Gold"
          value={gold}
          onChange={onChange}
        />
        <input
          className="medals-form__input__medal"
          name="silver"
          autoComplete="off"
          type="number"
          placeholder="Silver"
          value={silver}
          onChange={onChange}
        />
        <input
          className="medals-form__input__medal"
          name="bronze"
          autoComplete="off"
          type="number"
          placeholder="Bronze"
          value={bronze}
          onChange={onChange}
        />
        <button
          className="medals-form__save__button"
          disabled={!country || !gold || !silver || !bronze}
        >
          Add Country
        </button>
      </form>
    </div>
  );
};

export default Form;
