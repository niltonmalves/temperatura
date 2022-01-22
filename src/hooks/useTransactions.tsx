import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api';

interface Transaction {
  id: number;
  temperatura: number;
  estadoClinico: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id' | 'createdAt'>;

interface TransactionsProviderProps {
  children: ReactNode;
}

interface TransactionsContextData {
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData
);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    api.get('transactions')
      .then(response => {
        setTransactions(response.data.transactions)
        console.log('log do use efect :',response.data.transactions)
      })
  }, []);

  function createDateAsUTC(date: any) {
    console.log("this is input: ",  date)
    console.log('this is return: ', new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds())))
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
}

  async function createTransaction(transactionInput: TransactionInput) {
    const response = await api.post('/transactions', {
      ...transactionInput,
      // createdAt: new Date(),
      createdAt: createDateAsUTC(new Date()),
    })
    
    const { transaction } = response.data;
    console.log("transaction is: ", transaction)

    setTransactions([
      ...transactions,
      transaction,
    ]);
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);

  return context;
}