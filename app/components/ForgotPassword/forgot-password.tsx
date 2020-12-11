import React from 'react';
import { useState } from 'react';
import { Container, Row } from 'reactstrap';
import { forgotPassword } from './../../stores/services/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from "react-router-dom";

const Forgot = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const forgotPasswordBtn = () => {
    setEmailError(false);
    if (!email) {
      setEmailError(true);
      return;
    }
    forgotPassword(email)
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        setTimeout(() => {
          history.replace(`/`);
        }, 5000);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      })
  }
  return (
    <>
      <Container fluid>
        <ToastContainer />
        <Row className="fill-height">
          <div className="lightbox bg-2 m-auto">
            <div className="welcome-box bg-3 color-grey d-flex align-items-center">
              <p className="t-1">Amc System</p>
            </div>
            <div className="welcome-box">
              <p className="t-2">Forgot Password</p>
              <p className="mt-5">Email</p>
              <input type="text" className="input-1 mb-5" onChange={(e) => {
                setEmail(e.target.value);
              }} onKeyPress={event => {
                if (event.key === 'Enter') {
                  forgotPasswordBtn();
                }
              }} />
              {
                emailError === true ?
                  <p className="error-labels">Email is Required.</p>
                  : ''
              }
              <div className="btn-2 bg-positive" onClick={() => {
                forgotPasswordBtn()
              }}>
                <p>Recover Passowrd</p>
              </div>
              <Link to="/" className="btn-2 bg-negative" replace>Cancel</Link>
            </div>
          </div>
        </Row>
      </Container>
    </>
  )
};

export default Forgot;