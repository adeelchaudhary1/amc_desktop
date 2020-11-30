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
import { getAllRoles, updateRoleStatus } from "./../stores/services/role.service";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const RoleManage = () => {
  const history = useHistory();
  const [roles, setRoles] = useState<any>([]);
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  React.useEffect(() => {
    const getUserList = async () => {
      setLoading(true);
      try {
        const response = await getAllRoles(email);
        setRoles(response.data.data)
      } catch (error) {
        toast.error(error.response.data.message[0]);
      }
      setLoading(false);
    }
    getUserList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const getRoleListUpdated = async () => {
    setLoading(true);
    try {
      const response = await getAllRoles(email);
      setRoles(response.data.data)
    } catch (error) {
      toast.error(error.response.data.message[0]);
    }
    setLoading(false);
  }
  React.useEffect(() => {
    if (roles) {
      let i;
      res.length = 0;
      setRes(res)
      for (i = 0; i < roles.length; i++) {
        res.push(roles[i]);
        setRes(res)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roles]);
  const [res, setRes] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  function myFunction(e: any) {
    res.length = 0;
    setRes(res);
    var filter, td, i ;
    filter = e.target.value;
    for (i = 0; i < roles.length; i++) {
      td = roles[i].role_name;
      if (td) {
        if (td.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          res.push(roles[i]);
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
    if (data.status === 'active') {
      status = 'deactive'
    } else {
      status = 'active'
    }
    try {
      await updateRoleStatus(email, data.role_name, data.description, data.features, status)
      toast.success('Status Updated Successfully');
      setStatusSetPopup(false);
      getRoleListUpdated();
    } catch (error) { }
    setbankLoading(false);
  }
  const [statusSetPopup, setStatusSetPopup] = useState(false);
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
                    {data.status === 'active' ? <img src="assets/ban.svg" alt="" width="70" /> : <img src="assets/check.svg" alt="" width="70" />}
                    <h1 className="pb-3">Are You Sure?</h1>
                        Are you sure you want to {data.status === 'active' ? 'Deactivate' : 'Activate'} this Role?
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
    return res.map((role: any, index: any) => {
      return (
        <tr key={index}>
          <td>{role.role_name}</td>
          <td>{role.description}</td>
          <td className="captilize">{role.status}</td>
          <td className="d-flex justify-content-center">
            <div className="multi-icons">
              <img src="assets/view.svg" alt="" width="16" onClick={() => {
                sessionStorage.setItem('roleObj', JSON.stringify(role));
                sessionStorage.setItem('rolePageType', 'view');
                history.replace('/edit-role')
              }
              } />
              <img src="assets/edit.svg" alt="" width="16" onClick={() => {
                sessionStorage.setItem('roleObj', JSON.stringify(role));
                sessionStorage.setItem('rolePageType', 'edit');
                history.replace('/edit-role')
              }
              } />
              {role.status === 'active' ?
                <img src="assets/ban-light.svg" alt="" width="16"
                  onClick={() => {
                    setStatusSetPopup(true);
                    setData(role);
                  }} /> : <img src="assets/check.svg" alt="" width="16"
                    onClick={() => {
                      setStatusSetPopup(true);
                      setData(role);
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
          <h1>Role Management</h1>
          {!Loading ?
            <div className="form-holder">
              <div className="input-holder">
                <div className="input-1">
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <input type="search" id="myInput" className="input-1" data-tip="Search Role" placeholder="Name" value={searchValue} onChange={(e) => {
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
                <div className="btn-4 ml-4" onClick={
                  () => {
                    history.replace("/add-role");
                  }
                }>
                  <p>Add New</p>
                </div>
              </div>
              <table className="table my-table mt-5 ">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>status</th>
                    <th className="center">Actions</th>
                  </tr>
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

export default RoleManage;