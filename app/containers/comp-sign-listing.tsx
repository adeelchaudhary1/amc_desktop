import React, { useState } from 'react';
import Header from './../components/Header';
import { Container } from 'reactstrap';
import { Link, useHistory } from 'react-router-dom';
import moment from 'moment';
import { getAllPendingTransactions } from './../stores/services/transactions.service';
import ReactTooltip from 'react-tooltip';

const ComplianceSignatoryTransactions = (props: any) => {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState('');
  let [transactions, setTransactions] = useState([]);
  const [headLabel, setHeadLabel] = useState('');
  let [status, setStatus] = useState('');
  let [lastPageNum, setLastPageNum] = useState('');
  let [paginationArr, setPaginationArr] = useState(['']);
  let [currentPage, setCurrentPage] = useState('');
  React.useEffect(() => {
    setHeadLabel(props.match.params.type);
    getAllPendingTransactions(
      sessionStorage.getItem('email') || '',
      props.match.params.type.toUpperCase() === 'COMPLIANCE'
        ? 'COMPLIANCE'
        : props.match.params.type.toUpperCase() === 'SIGNATORY-A'
          ? 'INREVIEW,SIGNATORY-A'
          : 'INREVIEW,SIGNATORY-B',
      ''
    )
      .then((response) => {
        let pageArr = paginationArr;
        const pageName = pageArr.find(
          (x) => x === response.data.page_info.next_page_number
        );
        if (!pageName) {
          pageArr.push(response.data.page_info.next_page_number);
          setPaginationArr(pageArr);
          setLastPageNum(response.data.page_info.next_page_number);
          if (parseInt(response.data.page_info.total_count) !== 10) {
            setLastPageNum('');
          }
        }
        setTransactions(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [props.match.params.type]);
  React.useEffect(() => {
    searchFilters(undefined, undefined, currentPage);
  }, [currentPage]);
  const searchFilters = (statusVar = undefined, searchVar = undefined, pageNumber: string = '') => {
    getAllPendingTransactions(
      sessionStorage.getItem('email') || '',
      props.match.params.type.toUpperCase() === 'COMPLIANCE'
        ? 'COMPLIANCE'
        : props.match.params.type.toUpperCase() === 'SIGNATORY-A'
          ? 'INREVIEW,SIGNATORY-A'
          : 'INREVIEW,SIGNATORY-B',
      searchVar === undefined ? searchValue : searchVar,

    )
      .then((response) => {
        let pageArr = paginationArr;
        const pageName = pageArr.find(
          (x) => x === response.data.page_info.next_page_number
        );
        if (
          !pageName &&
          response.data.page_info.next_page_number != '9999999999999'
        ) {
          pageArr.push(response.data.page_info.next_page_number);
          setLastPageNum(response.data.page_info.next_page_number);
          setPaginationArr(pageArr);
        }
        console.log('Page Arr', pageArr);
        console.log('Current Page', currentPage);
        setTransactions(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Container fluid>
        <Header />
        <div className="body-pad">
          <div className="d-flex align-items-center">
            <h1 className="ml-4">{headLabel.toUpperCase() === 'SIGNATORY-A' ? 'AUTHORIZER-A' : headLabel.toUpperCase() === 'SIGNATORY-B' ? 'AUTHORIZER-B' : 'AUTHORIZER-B'} Transactions</h1>
          </div>
          <div className="form-holder">
            <div className="input-holder">
              <div className="d-flex">
                <div className="input-1">
                  <ReactTooltip
                    textColor="white"
                    backgroundColor="#1c5556"
                    effect="float"
                  />
                  <input
                    type="search"
                    id="myInput"
                    placeholder="Transaction Id"
                    data-tip="Search Transaction"
                    className="input-1"
                    value={searchValue}
                    onChange={(e) => {
                      setSearchValue(e.target.value);
                    }}
                  />
                </div>{' '}
                <div
                  className="btn-4 ml-4"
                  onClick={() => {
                    searchFilters();
                  }}
                >
                  <p>Search</p>
                </div>
                <div
                  className="btn-4 ml-2"
                  style={{
                    width: '148px',
                  }}
                  onClick={() => {
                    let typeTx =
                      props.match.params.type.toUpperCase() === 'COMPLIANCE'
                        ? 'COMPLIANCE'
                        : props.match.params.type.toUpperCase() ===
                          'SIGNATORY-A'
                          ? 'INREVIEW,SIGNATORY-A'
                          : 'INREVIEW,SIGNATORY-B';
                    setStatus('');
                    setSearchValue('');
                    searchFilters(typeTx, '');
                  }}
                >
                  <p>Clear</p>
                </div>
              </div>
            </div>
            <table className="table my-table mt-5">
              <thead>
                <tr>
                  <th>Transaction Id</th>
                  <th>AMC Name</th>
                  <th>Transaction Type</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction: any) => {
                  return (
                    <tr>
                      <td>{transaction.txn_id}</td>
                      <td>
                        {transaction.amc_name ? transaction.amc_name : 'N/A'}
                      </td>
                      <td>
                        {transaction.type_of_transaction
                          ? transaction.type_of_transaction
                          : 'N/A'}
                      </td>
                      <td>
                        {moment(transaction.txn_history[0].created_at).format(
                          'DD MMM YYYY'
                        )}
                      </td>
                      <td className=" ">
                        <div className="multi-icons">
                          <img
                            src="assets/view.svg"
                            alt=""
                            width="16"
                            style={{
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              sessionStorage.setItem(
                                'csab-txn',
                                JSON.stringify(transaction)
                              );
                              history.replace(`/signatory-a/${headLabel}`);
                            }}
                          />
                        </div>
                      </td>
                      <td>{transaction.txn_status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div
              className="row"
              style={{
                float: 'right',
              }}
            >
              {paginationArr[0] !== currentPage ? (
                <button
                  style={{
                    backgroundColor: '#003b3a',
                    borderColor: '#003b3a',
                    color: 'white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    let pageArr = paginationArr;
                    const findIndex = pageArr.findIndex(
                      (x) => x === currentPage
                    );
                    if (findIndex !== -1) {
                      const value = pageArr[findIndex - 1];
                      console.log(value);
                      setCurrentPage(value);
                    } else {
                    }
                  }}
                >
                  <i className="fa fa-arrow-left"></i>
                </button>
              ) : (
                  ''
                )}
              {lastPageNum !== currentPage ? (
                <button
                  style={{
                    backgroundColor: '#003b3a',
                    borderColor: '#003b3a',
                    color: 'white',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    let pageArr = paginationArr;
                    const findIndex = pageArr.findIndex(
                      (x) => x === currentPage
                    );
                    if (findIndex !== -1) {
                      if (pageArr[findIndex + 1]) {
                        const value = pageArr[findIndex + 1];
                        console.log('value', value);
                        setCurrentPage(value);
                      } else {
                        const value = pageArr[findIndex];
                        console.log('value', value);
                        setCurrentPage(value);
                      }
                    } else {
                    }
                  }}
                >
                  <i className="fa fa-arrow-right"></i>
                </button>
              ) : (
                  ''
                )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ComplianceSignatoryTransactions;
