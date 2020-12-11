import React, { useState } from 'react';
import Header from './../components/Header';
import { 
  Container,
  Row,
  Col,
} from 'reactstrap'; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addModeOfPayment, addInstrumentType, addModeOfTransaction, addNatureOfTransaction } from './../stores/services/funds.service';
import { Link } from 'react-router-dom'
const SetupAccount = () => {
  const [email, setEmail] = useState(sessionStorage.getItem('email') || "");
  const [mopCode, setMopCode] = useState('');
  const [motCode, setMotCode] = useState('');
  const [itCode, setItCode] = useState('');
  const [notCode, setNotCode] = useState('');
  const [mopName, setMopName] = useState('');
  const [motName, setMotName] = useState('');
  const [itName, setItName] = useState('');
  const [notName, setNotName] = useState('');
  const addModeOfPaymentBtn = () => {
    if (!mopCode) {
      return;
    }
    if (!mopName) {
      return;
    }
    addModeOfPayment(email, mopName, mopCode)
    .then((response) => {
      console.log(response);
      toast.success(response.data.message);
    })
    .catch((err) => {
      toast.error(err.message);
      console.log(err);
    })
  }

  const addInstrumentTypeBtn = () => {
    if (!itCode) {
      return;
    }
    if (!itName) {
      return;
    }
    addInstrumentType(email, itName, itCode)
    .then((response) => {
      console.log(response);
      toast.success(response.data.message);
    })
    .catch((err) => {
      toast.error(err.message);
      console.log(err);
    })
  }

  const addModeOfTransactionBtn = () => {
    if (!motCode) {
      return;
    }
    if (!motName) {
      return;
    }
    addModeOfTransaction(email, motName, motCode)
    .then((response) => {
      console.log(response);
      toast.success(response.data.message);
    })
    .catch((err) => {
      toast.error(err.message);
      console.log(err);
    })
  }

  const addNatureOfTransactionBtn = () => {
    if (!notCode) {
      return;
    }
    if (!notName) {
      return;
    }
    addNatureOfTransaction(email, notName, notCode)
    .then((response) => {
      console.log(response);
      toast.success(response.data.message);
    })
    .catch((err) => {
      toast.error(err.message);
      console.log(err);
    })
  }
  return(
    <>
      <Container fluid>
        <Header/>
        <ToastContainer />
        <div className="body-pad">
          <h1>Setup - Mode of Transactions</h1>
          <div className="form-holder">
            <div className="title-row">
              <Link to="/setup-nature/view-all" className="t-3 ml-auto" replace>View All</Link>
            </div>
            <Row>
              <Col md="6">
                <div className="box">
                  <p>Mode of Payment</p>
                  <div className="input-holder mb-4">
                    <p className="label">Code</p>
                    <input className="input-1" value={mopCode} onChange={(e) => {
                      setMopCode(e.target.value.toUpperCase())
                    }}/>
                  </div>
                  <div className="input-holder mb-4">
                    <p className="label">Name</p>
                    <input className="input-1" onChange={(e) => {
                      setMopName(e.target.value)
                    }}/>
                  </div>
                  <div className="add-btn" onClick={() => {
                    addModeOfPaymentBtn();
                  }}>
                    <img src="assets/add-circle.svg" alt="" width="24" />
                  </div>
                </div>
              </Col>
              <Col md="6">
              <div className="box">
                  <p>Nature of Transaction</p>
                  <div className="input-holder mb-4">
                    <p className="label">Code</p>
                    <input className="input-1" value={notCode} onChange={(e) => {
                      setNotCode(e.target.value.toUpperCase())
                    }}/>
                  </div>
                  <div className="input-holder mb-4">
                    <p className="label">Name</p>
                    <input className="input-1" onChange={(e) => {
                      setNotName(e.target.value)
                    }}/>
                  </div>
                  <div className="add-btn" onClick={() => {
                    addNatureOfTransactionBtn();
                  }}>
                    <img src="assets/add-circle.svg" alt="" width="24" />
                  </div>
                </div>
              </Col>
            </Row>
            
            <Row>
              <Col md="6">
              <div className="box">
                  <p>Type of Transaction</p>
                  <div className="input-holder mb-4">
                    <p className="label">Code</p>
                    <input className="input-1" value={motCode} onChange={(e) => {
                      setMotCode(e.target.value.toUpperCase())
                    }}/>
                  </div>
                  <div className="input-holder mb-4">
                    <p className="label">Name</p>
                    <input className="input-1" onChange={(e) => {
                      setMotName(e.target.value)
                    }}/>
                  </div>
                  <div className="add-btn" onClick={() => {
                    addModeOfTransactionBtn();
                  }}>
                    <img src="assets/add-circle.svg" alt="" width="24" />
                  </div>
                </div>
              </Col>
              <Col md="6">
                <div className="box">
                  <p>Instrument Type</p>
                  <div className="input-holder mb-4">
                    <p className="label">Code</p>
                    <input className="input-1" value={itCode} onChange={(e) => {
                      setItCode(e.target.value.toUpperCase())
                    }}/>
                  </div>
                  <div className="input-holder mb-4">
                    <p className="label">Name</p>
                    <input className="input-1" onChange={(e) => {
                      setItName(e.target.value)
                    }}/>
                  </div>
                  <div className="add-btn" onClick={() => {
                    addInstrumentTypeBtn();
                  }}>
                    <img src="assets/add-circle.svg" alt="" width="24" />
                  </div>
                </div>
              </Col>
            </Row>  
          </div>
        </div>
      </Container>
    </>
  )
};

export default SetupAccount;