import { useTransactions } from "../../hooks/useTransactions";
import { Container } from "./styles";

export function TransactionsTable() {
  const { transactions } = useTransactions()
  
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Temperatura</th>
            <th>EstadoClinico</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.temperatura}</td>
              <td className={transaction.estadoClinico}>
                {transaction.estadoClinico}
              </td>
              <td>
                {new Intl.DateTimeFormat(  'pt',
                                            {
                                              weekday: 'long',
                                              month: 'long',
                                              day: 'numeric',
                                              hour: 'numeric',
                                              minute: 'numeric',
                                              hourCycle: 'h23'
                                            }).format(
                  new Date(transaction.createdAt)
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}