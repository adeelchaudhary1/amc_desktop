import React, { useState } from 'react';
import Header from './../components/Header';
import { Modal } from 'react-bootstrap';
import ReactTooltip from 'react-tooltip';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { useHistory } from "react-router-dom";
import { getAllUsers, updateUserStatus } from "./../stores/services/user.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserManage = () => {
  const history = useHistory();
  let [users, setUsers] = useState<any>([]);
  const [Loading, setLoading] = useState(false);

  React.useEffect(() => {
    const getUserList = async () => {
      setLoading(true);
      try {
        const response = await getAllUsers(email);
        setUsers(response.data.data)
      } catch (error) {
        toast.error(error.response.data.message[0]);
      }
      setLoading(false);
    }
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getUserListUpdated = async () => {
    setLoading(true);
    try {
      const response = await getAllUsers(email);
      setUsers(response.data.data)
    } catch (error) {
      toast.error(error.response.data.message[0]);
    }
    setLoading(false);
  }
  React.useEffect(() => {
    if (users) {
      let i;
      res.length = 0;
      setRes(res)
      for (i = 0; i < users.length; i++) {
        res.push(users[i]);
        setRes(res)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [users]);
  const [res, setRes] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  function myFunction(e: any) {
    res.length = 0;
    setRes(res);
    var filter, td, i ;
    filter = e.target.value;
    for (i = 0; i < users.length; i++) {
      td = users[i].name;
      if (td) {
        if (td.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          res.push(users[i]);
          setRes(res)
        } else {

        }
      }
    }
  }
  const email = sessionStorage.getItem('email') || '';
  const updateStatus = async () => {
    setbankLoading(true);
    let status = '';
    if (currentBankStatus === 'active') {
      status = 'deactive'
    } else {
      status = 'active'
    }
    try {
      const response = await updateUserStatus(email, userEmail, status)
      toast.success(response.data.message);
      setStatusSetPopup(false);
      getUserListUpdated();
    } catch (error) { }
    setbankLoading(false);
  }
  const [statusSetPopup, setStatusSetPopup] = useState(false);
  const [currentBankStatus, setCurrentBankStatus] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [bankLoading, setbankLoading] = useState(false);
  const renderUpdateStatusPopup = () => {
    switch (statusSetPopup) {
      case true:
        return (
          <Modal
            className="text-dark modal-pos modal-margin-top border-0"
            dialogClassName="modal60w"
            show={true}
          >
            <div className="modal-view">
              <div className="center">
                <Row>
                  <div className="mx-auto">
                    {currentBankStatus === 'active' ? <img src="assets/ban.svg" alt="" width="70" /> : <img src="assets/check.svg" alt="" width="70" />}
                    <h1 className="pb-3">Are You Sure?</h1>
                        Are you sure you want to {currentBankStatus === 'active' ? 'Deactivate' : 'Activate'} this User?
                  </div>
                </Row>
                <Row>
                  <Col >
                    <button className="btn-3" disabled={Boolean(bankLoading)} onClick={() => { updateStatus() }}>
                      {bankLoading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="login-txt"> Loading...</span></> : 'Yes'}
                    </button>
                  </Col>
                  <Col>
                    <button className="btn-3" onClick={() => { setStatusSetPopup(false) }}>
                      Cancel
                    </button>
                  </Col>
                </Row>
              </div>
            </div>
          </Modal >
        )
      default:
        return '';
    }
  };
  const renderData = () => {
    return res.map((user: any, index: any) => {
      return (
        <tr key={index}>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td>{user.email}</td>
          <td className="captilize">{user.status}</td>
          <td className="d-flex justify-content-center">
            <div className="multi-icons">
              <img src="assets/view.svg" alt="" width="16" onClick={() => {
                sessionStorage.setItem('userObj', JSON.stringify(user));
                sessionStorage.setItem('userPageType', 'view');
                history.replace('/edit-user')
              }
              } />
              <img src="assets/edit.svg" alt="" width="16" onClick={() => {
                sessionStorage.setItem('userObj', JSON.stringify(user));
                sessionStorage.setItem('userPageType', 'edit');
                history.replace('/edit-user')
              }
              } />
              {user.status === 'active' ?
                <img src="assets/ban-light.svg" alt="" width="16"
                  onClick={() => {
                    setStatusSetPopup(true);
                    setCurrentBankStatus(user.status);
                    setUserEmail(user.email)
                  }} /> : <img src="assets/check.svg" alt="" width="16"
                    onClick={() => {
                      setStatusSetPopup(true);
                      setCurrentBankStatus(user.status);
                      setUserEmail(user.email)
                    }} />}
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
          <h1>User Management</h1>
          {!Loading ?
            <div className="form-holder">
              <div className="input-holder">
                <div className="input-1">
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <input type="search" id="myInput" className="input-1" data-tip="Search User" placeholder="Name" value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value);
                    myFunction(e);
                  }} />
                  <div className="date"><img src="assets/search.svg" alt="" width="16" /></div>
                </div>
                {/* <div className="d-flex">
                <div className="input-1">
                  <p className="label">Name / Email</p>
                </div>
                <div className="btn-4 ml-4">
                  <p>Search</p>
                </div>
              </div> */}
                <div className="btn-4 ml-4" onClick={() => {
                  history.replace('/add-user')
                }}>
                  <p>Add New</p>
                </div>
              </div>
              <table className="table my-table mt-5 ">
                <thead>
                  <th>Name</th>
                  <th>Roles</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th className="center">Actions</th>
                </thead>
                <tbody>
                  {
                    renderData()
                  }

                </tbody>
              </table>

            </div>
            :
            <div className="d-flex">
              <div className="spinner-border spiner-xp mt-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>}
          {renderUpdateStatusPopup()}
        </div>
      </Container>
    </>
  )
};

export default UserManage;