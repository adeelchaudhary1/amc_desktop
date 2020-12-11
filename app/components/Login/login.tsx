import React from 'react';
import { useState } from 'react';
import { Container, Row } from 'reactstrap';
import { login, twoFALogin } from './../../stores/services/auth.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useHistory } from "react-router-dom";
import { MdVisibility, MdVisibilityOff} from 'react-icons/md';

const Login = () => {
  let first_input: HTMLInputElement | null = null;
  let second_input: HTMLInputElement | null = null;
  let third_input: HTMLInputElement | null = null;
  let fourth_input: HTMLInputElement | null = null;
  let fifth_input: HTMLInputElement | null = null;
  let sixth_input: HTMLInputElement | null = null;
  const history = useHistory();
  const [popup, setPopup] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [twoFACode, setTwoFACode] = useState('');
  const [firstCode, setFirstCode] = useState('');
  const [secondCode, setSecondCode] = useState('');
  const [thirdCode, setThirdCode] = useState('');
  const [fourthCode, setFourthCode] = useState('');
  const [fifthCode, setFifthCode] = useState('');
  const [sixthCode, setSixthCode] = useState('');
  const [inputType, setInputType] = useState('password');

  const handleClick = () => {
    inputType === 'text' ? setInputType('password') : setInputType('text');
  }

  const loginBtn = () => {
    setLoading(true);
    setEmailError(false);
    setPasswordError(false);
    if (!email) {
      setEmailError(true);
      setLoading(false);
      return;
    }
    if (!password) {
      setPasswordError(true)
      setLoading(false);
      return;
    }
    login(email, password)
      .then((response) => {
        if (response.data.data.two_fa_enabled === 'true') {
          toast.success(response.data.message);
          setPopup(true);
          setLoading(false);
        } else {
          toast.success(response.data.message);
          sessionStorage.setItem('email', email);
          sessionStorage.setItem('role', response.data.data.role);
          sessionStorage.setItem('features', response.data.data.features);
          sessionStorage.setItem(
            'loggedInUser',
            JSON.stringify(response.data.data)
          );
          setLoading(false);
          history.replace('/dashboard');
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
        setLoading(false);
      })
  }
  const login2FaBtn = () => {
    setLoading(true);
    if (!firstCode) {
      setLoading(false);
      return;
    }
    if (!secondCode) {
      setLoading(false);
      return;
    }
    if (!thirdCode) {
      setLoading(false);
      return;
    }
    if (!fourthCode) {
      setLoading(false);
      return;
    }
    if (!fifthCode) {
      setLoading(false);
      return;
    }
    if (!sixthCode) {
      setLoading(false);
      return;
    }
    setTwoFACode(`${firstCode}${secondCode}${thirdCode}${fourthCode}${fifthCode}${sixthCode}`)
    twoFALogin(
      email,
      `${firstCode}${secondCode}${thirdCode}${fourthCode}${fifthCode}${sixthCode}`
    )
      .then((response) => {
        setLoading(false);
        console.log(response);
        toast.success(response.message);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('role', response.data.data.role);
        sessionStorage.setItem('features', response.data.data.features);
        sessionStorage.setItem(
          'loggedInUser',
          JSON.stringify(response.data.data)
        );
        history.replace('/dashboard');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  }
  return (
    <>
      <Container fluid>
        <ToastContainer />
        <div className={`overlay ${popup ? '' : 'hidden'}`}>
          <div className="popup">
            <p className="t-4">2-FA Authentication</p>
            <p>Please enter the 6-digit code</p>
            <div className="digit-holder mx-auto ">
              <input
                type="text"
                className="input-2"
                ref={(input) => {
                  first_input = input;
                }}
                maxLength={1}
                onChange={(e) => {
                  if (e.target.value.length === 1) {
                    setFirstCode(e.target.value);
                    second_input?.focus();
                  }
                  return;
                }}
              />
              <input
                type="text"
                className="input-2"
                ref={(input) => {
                  second_input = input;
                }}
                maxLength={1}
                onChange={(e) => {
                  if (e.target.value.length === 1) {
                    setSecondCode(e.target.value);
                    third_input?.focus();
                  }
                  return;
                }}
              />
              <input
                type="text"
                className="input-2"
                ref={(input) => {
                  third_input = input;
                }}
                maxLength={1}
                onChange={(e) => {
                  if (e.target.value.length === 1) {
                    setThirdCode(e.target.value);
                    fourth_input?.focus();
                  }
                  return;
                }}
              />
              <input
                type="text"
                className="input-2"
                ref={(input) => {
                  fourth_input = input;
                }}
                maxLength={1}
                onChange={(e) => {
                  if (e.target.value.length === 1) {
                    setFourthCode(e.target.value);
                    fifth_input?.focus();
                  }
                  return;
                }}
              />
              <input
                type="text"
                className="input-2"
                ref={(input) => {
                  fifth_input = input;
                }}
                maxLength={1}
                onChange={(e) => {
                  if (e.target.value.length === 1) {
                    setFifthCode(e.target.value);
                    sixth_input?.focus();
                  }
                  return;
                }}
              />
              <input
                type="text"
                className="input-2"
                ref={(input) => {
                  sixth_input = input;
                }}
                maxLength={1}
                onChange={(e) => {
                  if (e.target.value.length === 1) {
                    setSixthCode(e.target.value);
                  }
                  return;
                }}
              />
            </div>
            <div className="btn-holder">
              <button
                className="btn-1 bg-positive"
                onClick={login2FaBtn}
                disabled={Boolean(Loading)}
              >
                {Loading ? (
                  <>
                    <span
                      className="spinner-border login-txt spinner-border-sm"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    <span className="login-txt"> Loading...</span>
                  </>
                ) : (
                  <p>Confirm</p>
                )}
              </button>
              <div
                className="btn-1 bg-negative"
                onClick={() => {
                  setPopup(false);
                }}
              >
                <p>Cancel</p>
              </div>
            </div>
          </div>
        </div>
        <Row className="fill-height">
          <div className="lightbox bg-2 m-auto">
            <div className="welcome-box bg-3 color-grey d-flex align-items-center">
              <p className="t-1">Amc System</p>
            </div>
            <div className="welcome-box">
              <p className="t-2">Login</p>
              <p className="trustee-text">Amc System, Please enter your credentials to login</p>
              <p className="mt-5">Login</p>
              <input
                type="text"
                className="input-1"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    loginBtn();
                  }
                }}
              />
              {emailError === true ? (
                <p className="error-labels">Email is Required.</p>
              ) : (
                ''
              )}
              <p>Password</p>
              <div className="position-relative">
                <input
                  type={inputType}
                  className="input-1"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyPress={(event) => {
                    if (event.key === 'Enter') {
                      loginBtn();
                    }
                  }}
                />
                {inputType === 'text' ?
                <MdVisibility className="visibility-icon" onClick={() => handleClick()}/>
                :
                <MdVisibilityOff className="visibility-icon" onClick={() => handleClick()}/>
              }
              </div>
              {passwordError === true ? (
                <p className="error-labels">Password is Required.</p>
              ) : (
                ''
              )}
              <div className="login-holder">
                <button
                  className="btn-1 bg-positive"
                  onClick={loginBtn}
                  disabled={Boolean(Loading)}
                >
                  {Loading ? (
                    <>
                      <span
                        className="spinner-border login-txt spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      <span className="login-txt"> Loading...</span>
                    </>
                  ) : (
                    <p className="login-text">Login</p>
                  )}
                </button>
                <Link to="/forgot-password" className="t-3" replace>
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Login;