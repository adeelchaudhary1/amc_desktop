import React, { useState } from 'react';
import ToggleButton from 'react-toggle-button';
import Header from './../components/Header';
import { getTwoFACode, enableDisableTwoFA } from './../stores/services/auth.service';
import { Container, Row, Col } from 'reactstrap';
import { changePassword } from './../stores/services/user.service';
import { useHistory } from 'react-router-dom';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';
import loaderIcon from './../assets/loader.svg';
import { ToastContainer, toast } from 'react-toastify';
import ReactTooltip from 'react-tooltip';
import 'react-toastify/dist/ReactToastify.css';
const UserManage = () => {
  const history = useHistory();
  let [changePass, setChangePAssword] = useState(false);
  let [toggleState, setToggleState] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [mainLoader, setMainLoader] = useState(false);
  let [oldPassword, setOldPassword] = useState('');
  let [newPassword, setNewPassword] = useState('');
  let [repeatPassword, setRepeatPassword] = useState('');
  let [twoFaCode, setTwoFaCode] = useState(-1);
  let [userObj, setUserObj] = useState(
    JSON.parse(sessionStorage.getItem('loggedInUser') || '')
  );

  React.useEffect(() => {
    if (userObj.two_fa_enabled === 'true') {
      setToggleState(true);
    } else {
      setToggleState(false);
    }
  }, []);

  const [inputType, setInputType] = useState('password');

  const handleClick = () => {
    inputType === 'text' ? setInputType('password') : setInputType('text');
  }

  const getTwoFACodeFn = () => {
    getTwoFACode(userObj.email)
      .then((response) => {
        toast.success(response.data.message);
        console.log(response);
        setMainLoader(false);
      })
      .catch((err) => {
        console.log(err);
        setMainLoader(false);
      });
  }

  const enableDisableTwoFAFn = () => {
    setLoading(true);
    console.log(toggleState);
    if (twoFaCode === -1) {
      setLoading(false);
      return;
    }
    enableDisableTwoFA(userObj.email, twoFaCode.toString(), toggleState.toString())
      .then((response) => {
        console.log(response);
        toast.success(response.data.message);
        userObj.two_fa_enabled = toggleState.toString();
        sessionStorage.setItem('loggedInUser', JSON.stringify(userObj));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setLoading(false);
      })
  }
  const passRegex = new RegExp(/^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,30})$/);
  const [oldPassError, setOldPassError] = useState('');
  const [newPassError, setNewPassError] = useState('');
  const [repPassError, setRepPassError] = useState('');
  const validate = () => {
    let oldpasErr, newPassErr, RepPassErr = '';
    oldPassword.trim() === '' ? oldpasErr = 'Required' : oldpasErr = '';
    newPassword.trim() === '' ? newPassErr = 'Required' : (passRegex.test(newPassword) !== true) ? newPassErr = 'Password Invalid' : newPassErr = "";
    repeatPassword.trim() === '' ? RepPassErr = 'Required' : newPassword !== repeatPassword ? RepPassErr = 'Password Not Match' : RepPassErr = '';
    if (oldpasErr || newPassErr || RepPassErr) {
      setOldPassError(oldpasErr)
      setNewPassError(newPassErr)
      setRepPassError(RepPassErr)
      return false;
    } else {
      return true
    }

  }
  const changePasswordBtn = async () => {
    const isValid = validate();
    if (isValid) {
      setLoading(true);
      try {
        const response = await changePassword(
          sessionStorage.getItem('email') || '',
          oldPassword,
          newPassword
        )
        console.log(response);
        sessionStorage.clear();
        history.replace('/');
      } catch (error) {
        toast.error(error.response.data.message)
      }
      setLoading(false);
    }
  }
  const renderContent = () => {
    const borderRadiusStyle = { borderRadius: 2 };
    if (!changePass) {
      return (
        <div className="mt-5">
          <ToggleButton
            value={toggleState || false}
            thumbStyle={borderRadiusStyle}
            trackStyle={borderRadiusStyle}
            onToggle={() => {
              setMainLoader(true);
              setToggleState(!toggleState);
              getTwoFACodeFn();
            }}
          />
          {
            mainLoader === false ?
              <>
                <p className="setting-title">2FA Authentication</p>
                <Row>
                  <Col md="6">
                    <div className="input-holder mt-5">
                      <p className="label">Enter 6-Digit Code</p>
                      <input className="input-1" onChange={(e) => {
                        setTwoFaCode(parseInt(e.target.value));
                      }} />
                    </div>
                  </Col>
                </Row>
                <button
                  className="btn-1 bg-positive"
                  onClick={enableDisableTwoFAFn}
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
                      <p>Update</p>
                    )}
                </button>
              </>
              :
              <img src={loaderIcon} alt="icon" />
          }
        </div>
      );
    } else {
      return (
        <div>
          <p className="setting-title">Change Password</p>
          <Row>
            <Col md="6">
              <div className="input-holder mt-5">
                <p className="label">Old Password</p>
                <div className="position-relative-pass">
                  <input
                    type={inputType}
                    className="input-1"
                    onChange={(e) => {
                      setOldPassword(e.target.value);
                      setOldPassError('');
                    }}
                  />
                  {oldPassError ? <p className="error-labels error-pass-change">{oldPassError}</p> : ''}
                  {inputType === 'text' ?
                    <MdVisibility className="visibility-icon-pass" onClick={() => handleClick()} />
                    :
                    <MdVisibilityOff className="visibility-icon-pass" onClick={() => handleClick()} />
                  }
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" html={true} />
              <div className="input-holder mt-5" data-tip="Password Should be at least 8 characters <br/> including special characters">
                <p className="label">New Password</p>
                <div className="position-relative-pass">
                  <input
                    type={inputType}
                    className="input-1"
                    onChange={(e) => {
                      setNewPassword(e.target.value);
                      setNewPassError('');
                    }}
                  />
                  {newPassError ? <p className="error-labels error-pass-change">{newPassError}</p> : ''}
                  {inputType === 'text' ?
                    <MdVisibility className="visibility-icon-pass" onClick={() => handleClick()} />
                    :
                    <MdVisibilityOff className="visibility-icon-pass" onClick={() => handleClick()} />
                  }
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="6">
              <div className="input-holder mt-5">
                <p className="label">Repeat Password</p>
                <div className="position-relative-pass">
                  <input
                    type={inputType}
                    className="input-1"
                    onChange={(e) => {
                      setRepeatPassword(e.target.value);
                      setRepPassError('');
                    }}
                  />
                  {repPassError ? <p className="error-labels error-pass-change">{repPassError}</p> : ''}
                  {inputType === 'text' ?
                    <MdVisibility className="visibility-icon-pass" onClick={() => handleClick()} />
                    :
                    <MdVisibilityOff className="visibility-icon-pass" onClick={() => handleClick()} />
                  }
                </div>
              </div>
            </Col>
          </Row>
          <button className="btn-3 bg-positive btn-update-password" onClick={changePasswordBtn} disabled={Boolean(Loading)}>
            {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
              <span className="login-txt"> Loading...</span></> : <p>Update Password</p>}
          </button>
        </div>
      );
    }
  };

  return (
    <>
      <Container fluid>
        <Header />
        <ToastContainer />
        <div className="body-pad">
          <h1>User Settings</h1>
          <div className="form-holder">
            <div className="w-100 d-flex">
              <div
                onClick={() => {
                  setChangePAssword(false);
                }}
                className={`user-header ${changePass ? '' : 'selected-option'}`}
              >
                <span>2FA Authentication</span>
              </div>
              <div
                onClick={() => {
                  setChangePAssword(true);
                }}
                className={`user-header ${changePass ? 'selected-option' : ''}`}
              >
                <span>Change Password</span>
              </div>
            </div>

            {renderContent()}
          </div>
        </div>
      </Container>
    </>
  );
};

export default UserManage;
