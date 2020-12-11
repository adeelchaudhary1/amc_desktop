import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import moment from 'moment';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { getFunds } from './../stores/services/funds.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

const AMCList = () => {
  const email = sessionStorage.getItem('email') || '';
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  React.useEffect(() => {
    const getBankList = async () => {
      setLoading(true);
      try {
        const response = await getFunds(email);
        console.log(response.data.data)
        setData(response.data.data)
      } catch (error) {
        toast.error(error.response.data.message[0]);
      }
      setLoading(false);
    }
    getBankList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderData = () => {
    return data.map((items: any, index: any) => {
      return (
        <tr key={index}>
          <td>{items.amc_name}</td>
          <td>{items.fund_name}</td>
          {/* <td>1 Million</td> */}
          <td>{moment(items.created_at).format("DD MMM YYYY")}</td>
          <td className="d-flex justify-content-center">
            <div className="multi-icons">
              <img src="assets/delete.svg" alt="" width="16" />
              <img src="assets/edit.svg" alt="" width="16" />
            </div>
          </td>
        </tr>
      );
    })
  }
  return (
    <>
      <Container fluid>
        <ToastContainer limit={1} />
        <Header />
        <div className="body-pad">
          <div className="d-flex align-items-center">
            <Link to="/setup-funds" replace><img src="assets/arrow-left.svg" alt="" width="24" /></Link>
            <h1 className="ml-4">Fund Listing</h1>
          </div>
          {!Loading ?
            <div className="form-holder">
              <table className="table my-table">
                <thead>
                  <th>AMC Name</th>
                  <th>Fund</th>
                  {/* <th>Amount</th> */}
                  <th>Created At</th>
                  <th className="center">Action</th>
                </thead>
                <tbody>
                  {renderData()}
                </tbody>
              </table>
            </div>
            :
            <div className="d-flex">
              <div className="spinner-border spiner-xp mt-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>}
        </div>
      </Container>
    </>
  )
};

export default AMCList;