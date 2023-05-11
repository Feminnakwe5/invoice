import { useSelector } from 'react-redux';
import { selectInvoiceById } from './invoiceSlice';

const InvoiceCard = ({ id }) => {
  const invoice = useSelector((state) => selectInvoiceById(state, id));
  console.log(invoice);
  return (
    <div key={invoice.id} className='card'>
      <p>{invoice.id}</p>
      <p>{invoice.paymentDue}</p>
      <p>{invoice.clientName}</p>
      <p>{invoice.total}</p>
      <p>{invoice.status}</p>
    </div>
  );
};

export default InvoiceCard;
