import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import closeImg from '../../assets/close.svg';


import { Container, TransactionTypeContainer, RadioBox } from './styles';

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function NewTransactionModal({ isOpen, onRequestClose }: NewTransactionModalProps) {
  const { createTransaction } = useTransactions();

  const [temperatura, setTemperatura] = useState(0);
  const [estadoClinico, setEstadoClinico] = useState('');

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await createTransaction({ 
      temperatura,
      estadoClinico,
    })

    setTemperatura(0);
    setEstadoClinico('');
    onRequestClose();
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button 
        type="button" 
        onClick={onRequestClose} 
        className="react-modal-close"
      >
        <img src={closeImg} alt="Fechar modal" />
      </button>

      <Container onSubmit={handleCreateNewTransaction}>
        <h2>Registrar Temperatura</h2>

        <input
          placeholder="Temperatura"
          value={temperatura}
          onChange={event => setTemperatura(Number(event.target.value))}
        />

        <input
          type="string"
          placeholder="EstadoClinico"
          value={estadoClinico}
          onChange={event => setEstadoClinico(event.target.value)}
        />

        <button type="submit">
          Cadastrar
        </button>
      </Container>
    </Modal>
  );
}