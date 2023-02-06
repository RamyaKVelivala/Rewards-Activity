import { useState, useEffect } from "react";
import './App.css';
import RewardsActivity from './components/RewardsActivity';
import getTransactionsList from './services/transactions.data.service';

export default function App() {
  const [transactionsList, settransactionsList] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    getTransactionsList()
      .then((data) => settransactionsList(data))
      .catch((e) => setError(true));
  }, []);

  return error ? (
    <p>Unable to fetch data</p>
  ) : (
    <div className="App">
      <h1>Rewards Activity</h1>
      <RewardsActivity transactionsList={transactionsList} />
    </div>
  );
}
