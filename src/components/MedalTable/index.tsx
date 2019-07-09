import { getCode } from 'country-list';
import React from 'react';

interface IMedals {
  gold: string;
  silver: string;
  bronze: string;
}

interface IMedalData {
  country: string;
  medals: IMedals;
}

interface ITableProps {
  data: IMedalData[];
  onDelete(country: string): void;
  onSelect?(country: string): void;
}

const MedalTable = ({ data, onDelete, onSelect }: ITableProps) => {
  const getCountryCode = (country: string) => {
    const countryCode = getCode(country);

    if (countryCode) {
      return countryCode.toLocaleLowerCase();
    }

    return '';
  };

  return (
    <div className="grid">
      <table className="medal-table">
        <thead>
          <tr>
            <th className="medal-table__header__cell">#</th>
            <th className="medal-table__header__cell">Country</th>
            <th className="medal-table__header__cell">
              <span className="medal-table__header__cell--gold" />
            </th>
            <th className="medal-table__header__cell">
              <span className="medal-table__header__cell--silver" />
            </th>
            <th className="medal-table__header__cell">
              <span className="medal-table__header__cell--bronze" />
            </th>
            <th className="medal-table__header__cell">Total</th>
            <th className="medal-table__header__cell">&nbsp;</th>
          </tr>
        </thead>
        <tbody className="medal-table__body">
          {data.map(({ country, medals: { gold, silver, bronze } }, index) => (
            <tr
              className="medal-table__row"
              key={country}
              onClick={() => onSelect && onSelect(country)}
            >
              <td className="medal-table__body__cell">{index + 1}</td>
              <td className="medal-table__body__cell">
                <span
                  className={`flag-icon flag-icon-${getCountryCode(country)}`}
                />
                <span className="medal-table__body__country">{country}</span>
              </td>
              <td className="medal-table__body__cell">{gold}</td>
              <td className="medal-table__body__cell">{silver}</td>
              <td className="medal-table__body__cell">{bronze}</td>
              <td className="medal-table__body__cell">
                {Number(gold) + Number(silver) + Number(bronze)}
              </td>
              <td className="medal-table__body__cell">
                <div className="medal-table__body__cell__actions">
                  <button
                    className="medal-table__delete__button"
                    onClick={event => {
                      event.stopPropagation();
                      onDelete(country);
                    }}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MedalTable;
