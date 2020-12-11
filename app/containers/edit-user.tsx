import React, { useState } from 'react';
import Header from './../components/Header';
import {
  Container,
  Row,
  Col,
} from 'reactstrap';
import { Link, useHistory } from "react-router-dom";
import { getAllRoles } from "./../stores/services/role.service";
import { editUser } from "./../stores/services/user.service";
import { toast , ToastContainer } from 'react-toastify';

const EditUser = () => {
  const history = useHistory();
  const [Loading, setLoading] = useState(false);
  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [role, setRole] = useState(-1);
  const [roles, setRoles] = useState([]);
  let [nameError, setNameError] = useState(false);
  let [emailError, setEmailError] = useState(false);
  let [invalidEmailError, setInvalidEmailError] = useState(false);
  let [roleError, setRoleError] = useState(false);
  let [hideBtn, setHideBtn] = useState(false);
    let [labelValue, setLabelValue] = useState('');
  React.useEffect(() => {
    if (sessionStorage.getItem('userPageType') === "view") {
        const obj = JSON.parse(sessionStorage.getItem('userObj') || "");
        setLabelValue('View');
        setUserName(obj.name);
        setUserEmail(obj.email);
        setRole(obj.role)
        setHideBtn(true);
    } else {
        const obj = JSON.parse(sessionStorage.getItem('userObj') || "");
        setLabelValue('Edit');
        setUserName(obj.name);
        setUserEmail(obj.email);
        setRole(obj.role)
    }
    getAllRoles(sessionStorage.getItem("email") || "")
      .then((response) => {
        console.log(response);
        setRoles(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      })
  }, [])
  const ValidateEmail = (email: string) => {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
      return (true)
    }
    return (false)
  }
  const addUserBtn = () => {
    setNameError(false);
    setEmailError(false);
    setRoleError(false);
    setInvalidEmailError(false);
    setLoading(true);
    if (!user_name) {
      setNameError(true);
      setLoading(false);
      return;
    }
    if (!user_email) {
      setEmailError(true);
      setLoading(false);
      return;
    }
    if (!ValidateEmail(user_email)) {
      setInvalidEmailError(true);
      setLoading(false);
      return;
    }
    if (role === -1) {
      setRoleError(true);
      setLoading(false);
      return;
    }
    editUser(user_email, user_name, role.toString())
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setTimeout(function () {
          history.replace('/user-management');
        },3000);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.message);
      });
  }
  return (
    <>
      <Container fluid>
        <ToastContainer limit={1}/>
        <Header />
        <div className="body-pad">
          <h1>{labelValue} User</h1>
          <div className="form-holder">
            <div className="title-row">
              <h3 className="mb-1">User Info</h3>
              <Link to="/user-management" className="t-3" replace>View All</Link>
            </div>
            {
                            hideBtn === true ? '' :
                <p className="t-3 mb-2">Please enter the following information to edit a new admin or user for Amc system</p>
            }
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Name</p>
                  <input className="input-1" defaultValue = {user_name} onChange={(e) => {
                    setUserName(e.target.value);
                  }} />
                </div>
                {
                  nameError === true ?
                    <p className="error-labels">Name is Required.</p>
                    : ''
                }
              </Col>
              <Col md="6">
                <div className="input-holder right">
                  <p className="label">Email</p>
                  <input className="input-1" defaultValue = {user_email} onChange={(e) => {
                    setUserEmail(e.target.value);
                  }} disabled={true}/>
                </div>
                {
                  emailError === true ?
                    <p className="error-labels">Email is Required.</p>
                    : ''
                }
                {
                  invalidEmailError === true ?
                    <p className="error-labels">Email is Invalid.</p>
                    : ''
                }
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label">Select Role</p>
                  <select className="input-1" value = {role} onChange={(e) => {
                    setRole(e.target.value);
                  }}>
                    <option value="-1">Select Role</option>
                    {
                      roles.map((role) => {
                        return (
                          <option value={role.role_name}>{role.role_name}</option>
                        )
                      })
                    }
                  </select>
                </div>
                {
                  roleError === true ?
                    <p className="error-labels">Role is Required.</p>
                    : ''
                }
              </Col>
            </Row>
{
                            hideBtn === false ?
            <button className="btn-3" onClick={addUserBtn} disabled={Boolean(Loading)}>
              {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="login-txt"> Loading...</span></> : <p>Edit User</p>}
            </button> : ''
}
          </div>

        </div>
      </Container>
    </>
  )
};

export default EditUser;