import React, { useState } from 'react';
import Header from './../components/Header';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { getAllPendingTransactions } from './../stores/services/transactions.service';
const PendingTransactions = () => {
  let [transactions, setTransactions] = useState<any>([]);
  let [status, setStatus] = useState('');
  let [lastPageNum, setLastPageNum] = useState('');
  let [paginationArr, setPaginationArr] = useState(['']);
  let [currentPage, setCurrentPage] = useState('');
  React.useEffect(() => {
    searchFilters(undefined, undefined, currentPage);
  }, [currentPage]);
  React.useEffect(() => {
    getAllPendingTransactions(sessionStorage.getItem('email') || '', '', '')
      .then((response) => {
        console.log(response.data.page_info);
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
  }, []);
  const searchFilters = (statusVar = undefined, searchVar = undefined, pageNumber: string = '') => {
    setLoading(true);
    getAllPendingTransactions(
      sessionStorage.getItem('email') || '',
      statusVar === undefined ? status : statusVar,
      searchVar === undefined ? searchValue : searchVar,
      '',
      pageNumber
    )
      .then((response) => {
        setTransactions(response.data.data);
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
      })
      .catch((err) => {
        console.log(err);
      });
    setLoading(false);
  }
  const [Loading, setLoading] = useState(false);
  const [view, setView] = useState(false);
  const [data, setData] = useState<any>([]);
  const titleCase = (value: string) => {
    let sentence = value.toLowerCase().split('_');
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(' ');
  };
  const renderData = () => {
    console.log(data);
    return data.map((value: any, index: number) => {
      return (
        <>
          {value[0] !== 'txn_history' && value[0] !== 'file' ? (
            <Col md="6" key={index}>
              <div className="input-holder left">
                <p className="label">{titleCase(value[0])}</p>
                <div className="input-1 hide-overflow">
                  <p
                    style={{
                      fontSize: '12px',
                    }}
                  >
                    {typeof value[1] === 'string'
                      ? value[0] === 'file'
                        ? 'N/A'
                        : value[1]
                      : value[0] === 'file'
                        ? 'N/A'
                        : ''}
                  </p>
                </div>
              </div>
            </Col>
          ) : (
              ''
            )}
        </>
      );
    });
  };

  const renderDataOfTransaction = () => {
    return transactions.map((transaction: any, index: any) => {
      return (
        <tr key={index}>
          <td>
            {transaction.txn_id}
          </td>
          <td>
            {transaction.amc_name
              ? transaction.amc_name
              : 'N/A'}
          </td>
          <td>
            {transaction.name_of_beneficiary
              ? transaction.name_of_beneficiary
              : 'N/A'}
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
              <img src="assets/view.svg" alt="" width="16" onClick={() => {
                let objArr = Object.entries(transaction);
                setData(objArr);
                setView(true)
              }} />
            </div>
          </td>
          <td>{transaction.txn_status}</td>
        </tr>

      );
    })
  }
  const [searchValue, setSearchValue] = useState('');
  return (
    <>
      <Container fluid>
        <Header />
        {!view ? (
          <div className="body-pad">
            <div className="d-flex align-items-center">
              {/* <Link to="/setup-accounts" replace>
                <img src="assets/arrow-left.svg" alt="" width="24" />
              </Link> */}
              <h1>Transactions</h1>
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
                  </div>
                  <div className="mr-5">
                    <div className="row d-flex align-items-center">
                      <div className="ml-4">
                        <input
                          type="radio"
                          id="listed"
                          name="type"
                          value="listed"
                          checked={status === 'COMPLIANCE'}
                          onChange={() => {
                            setStatus('COMPLIANCE');
                          }}
                        />
                        <label className="mb-0 ml-2">Compliance</label>
                      </div>
                      <div className="ml-4">
                        <input
                          type="radio"
                          id="unlisted"
                          name="type"
                          value="unlisted"
                          checked={status === 'INREVIEW'}
                          onChange={() => {
                            setStatus('INREVIEW');
                          }}
                        />
                        <label className="mb-0 ml-2">In Review</label>
                      </div>
                      <div className="ml-4">
                        <input
                          type="radio"
                          id="unlisted"
                          name="type"
                          value="unlisted"
                          checked={status === 'SIGNATORY-A'}
                          onChange={() => {
                            setStatus('SIGNATORY-A');
                          }}
                        />
                        <label className="mb-0 ml-2">Signatory A</label>
                      </div>
                      <div className="ml-4">
                        <input
                          type="radio"
                          id="unlisted"
                          name="type"
                          value="unlisted"
                          checked={status === 'SIGNATORY-B'}
                          onChange={() => {
                            setStatus('SIGNATORY-B');
                          }}
                        />
                        <label className="mb-0 ml-2">Signatory B</label>
                      </div>
                    </div>

                    <div className="d-flex row align-items-center">
                      <div className="ml-4">
                        <input
                          type="radio"
                          id="unlisted"
                          name="type"
                          value="unlisted"
                          checked={status === 'AUTHORIZER-A'}
                          onChange={() => {
                            setStatus('AUTHORIZER-A');
                          }}
                        />
                        <label className="mb-0 ml-2">Authorizer A</label>
                      </div>
                      <div className="ml-4">
                        <input
                          type="radio"
                          id="unlisted"
                          name="type"
                          value="unlisted"
                          checked={status === 'AUTHORIZER-B'}
                          onChange={() => {
                            setStatus('AUTHORIZER-B');
                          }}
                        />
                        <label className="mb-0 ml-2">Authorizer B</label>
                      </div>
                      <div className="ml-4">
                        <input
                          type="radio"
                          id="unlisted"
                          name="type"
                          value="unlisted"
                          checked={status === 'COMPLETED'}
                          onChange={() => {
                            setStatus('COMPLETED');
                          }}
                        />
                        <label className="mb-0 ml-2">Completed</label>
                      </div>
                      <div className="ml-4">
                        <input
                          type="radio"
                          id="unlisted"
                          name="type"
                          value="unlisted"
                          checked={status === 'REJECTED'}
                          onChange={() => {
                            setStatus('REJECTED');
                          }}
                        />
                        <label className="mb-0 ml-2">Rejected</label>
                      </div>
                    </div>
                  </div>
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
                      setStatus('');
                      setSearchValue('');
                      searchFilters('', '');
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
                    <th>Assigned Trustee</th>
                    <th>Transaction Type</th>
                    <th>Date Created</th>
                    <th>Actions</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{transaction.txn_id}</td>
                        <td>
                          {transaction.amc_name ? transaction.amc_name : 'N/A'}
                        </td>
                        <td>
                          {transaction.name_of_beneficiary
                            ? transaction.name_of_beneficiary
                            : 'N/A'}
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
                              onClick={() => {
                                let objArr = Object.entries(transaction);
                                setData(objArr);
                                setView(true);
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
        ) : (
            <div className="body-pad">
              <h1>
                <img
                  src="assets/arrow-left.svg"
                  onClick={() => {
                    setView(false);
                  }}
                  className="mr-3"
                  alt=""
                  width="24"
                />
              View - Pending Transaction
            </h1>
              <div className="form-holder">
                {data ? <Row>{renderData()}</Row> : ''}
              </div>
            </div>
          )}
      </Container>
    </>
  );
};

export default PendingTransactions;
