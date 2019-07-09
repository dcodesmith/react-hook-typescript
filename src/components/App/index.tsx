import React, { useReducer } from 'react';
import medalReducer, { INITIAL_STATE } from '../../reducer';
import MedalForm from '../MedalForm';
import MedalTable from '../MedalTable';

import './styles.scss';

const App: React.FC = () => {
  const [{ data }, dispatch] = useReducer(medalReducer, INITIAL_STATE);

  const onSave = (values: any): void => dispatch({ type: 'ADD', item: values });

  const onSelect = (country: string): void => {
    dispatch({ type: 'SELECT', country });
  };

  const onEdit = (values: any): void =>
    dispatch({ type: 'EDIT', item: values });

  const onDelete = (country: string): void =>
    dispatch({ type: 'REMOVE', country });

  return (
    <div className="App">
      <MedalForm onSave={onSave} />
      <MedalTable onDelete={onDelete} onSelect={onSelect} data={data} />
    </div>
  );
};

export default App;
