import React from 'react';
import Header from './../components/Header';
import {
  Container,
} from 'reactstrap';
import { Link } from 'react-router-dom';

const NatureList = () => {
  return (
    <>
      <Container fluid>
        <Header />
        <div className="body-pad">
          <div className="d-flex align-items-center">
            <Link to="/setup-nature" replace><img src="assets/arrow-left.svg" alt="" width="24" /></Link>
            <h1 className="ml-4">Master - Nature of Transaction Listing</h1>
          </div>
          <div className="form-holder">
            <div className="input-holder">
              <div className="input-1">
                <input type="search" className="input-1" />
                <div className="date"><img src="assets/search.svg" alt="" width="16" /></div>
              </div>
            </div>
            <table className="table my-table">
              <thead>
                <tr>
                  <th>Transaction Name</th>
                  <th>Transaction Code</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>00032665</td>
                  <td>Transaction Code</td>
                </tr>
                <tr>
                  <td>00215545</td>
                  <td>Investment</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </>
  )
};

export default NatureList;