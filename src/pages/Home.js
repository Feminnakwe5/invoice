import ToggleBar from '../components/ToggleBar';
import {
  useGetInvoiceQuery,
  selectInvoiceIds,
} from '../features/invoice/invoiceSlice';
import InvoiceCard from '../features/invoice/InvoiceCard';
import { IoIosAddCircle } from 'react-icons/io';
import { useSelector } from 'react-redux';

const Home = () => {
  const { isLoading, isSuccess, isError, error } = useGetInvoiceQuery();
  const orderedInvoiceID = useSelector(selectInvoiceIds);

  let content;
  if (isLoading) {
    content = <p>Loading...</p>;
  } else if (isSuccess) {
    content = orderedInvoiceID.map((id) => {
      return (
        <div>
          <InvoiceCard id={id} key={id} />
        </div>
      );
    });
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div className='home'>
      <div>
        <ToggleBar />
      </div>
      <div className='main-content'>
        {/* {showForm ? <InvoiceForm /> : ''} */}
        <div className='invoice-header'>
          <div>
            <h1>Invoices</h1>
            <p>There are 7 total invoices</p>
          </div>
          <div>
            <p>filter by status</p>
            <button>
              <IoIosAddCircle /> New Invoice
            </button>
          </div>
        </div>
        <div className='invoice-list'>{content}</div>
      </div>
    </div>
  );
};

export default Home;
