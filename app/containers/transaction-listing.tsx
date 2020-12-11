import React, { useState } from 'react';
import Header from './../components/Header';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import moment from 'moment';
import { getAllPendingTransactions } from './../stores/services/transactions.service';
import ReactTooltip from 'react-tooltip';

const TransactionListing = () => {
  let [transactions, setTransactions] = useState([]);
  let [lastPageNum, setLastPageNum] = useState('');
  let [paginationArr, setPaginationArr] = useState(['']);
  let [currentPage, setCurrentPage] = useState('');
  const userEmail = sessionStorage.getItem('email') || ''
  React.useEffect(() => {
    getAllPendingTransactions(sessionStorage.getItem('email') || '', 'COMPLIANCE', '', userEmail)
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
  }, [])
  const [searchValue, setSearchValue] = useState('');
  React.useEffect(() => {
    searchFilters(undefined, undefined, currentPage);
  }, [currentPage]);
  const searchFilters = (statusVar = undefined, searchVar = undefined, pageNumber: string = '') => {
    getAllPendingTransactions(
      sessionStorage.getItem('email') || '',
      'COMPLIANCE',
      searchVar === undefined ? searchValue : searchVar,
      userEmail,
      pageNumber
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
  return (
    <>
      <Container fluid>
        <Header />
        {!view ? (
          <div className="body-pad">
            <div className="d-flex align-items-center">
              <h1 className="ml-4">Transaction Listing</h1>
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
                  <div className="btn-4 ml-4" onClick={() => {
                    searchFilters();
                  }}>
                    <p>Search</p>
                  </div>
                  <div
                    className="btn-4 ml-2"
                    style={{
                      width: '148px',
                    }}
                    onClick={() => {
                      setSearchValue('');
                      searchFilters('', '', '');
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
                            <img src="assets/view.svg" onClick={() => {
                              let objArr = Object.entries(transaction);
                              setData(objArr);
                              setView(true);
                            }} alt="" width="16" />
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
              View - Transaction
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

export default TransactionListing;
