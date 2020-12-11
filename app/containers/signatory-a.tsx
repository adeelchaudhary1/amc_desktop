import React, { useState } from 'react';
import Header from './../components/Header';
import { Container, Row, Col } from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { updateTransactionStatus } from './../stores/services/transactions.service';
import { Link } from 'react-router-dom';

const SignatoryA = (props: any) => {
  const [values, setValues] = useState<any>([]);
  const [headLabel, setHeadLabel] = useState('');
  const [note, setNote] = useState('');
  const [trx_id, setTrxId] = useState('');
  const [trx_status, setTrxStatus] = useState('');
  const [trx_history, setTrxHistory] = useState([]);
  const [Loading, setLoading] = useState(false);
  React.useEffect(() => {
    setHeadLabel(props.match.params.type);
    const obj = JSON.parse(sessionStorage.getItem('csab-txn') || '');
    console.log(obj);
    setTrxId(obj.txn_id);
    setTrxStatus(obj.txn_status);
    let objArr = Object.entries(obj);
    setValues(objArr);
  }, [props.match.params.type]);
  const titleCase = (value: string) => {
    let sentence = value.toLowerCase().split('_');
    for (let i = 0; i < sentence.length; i++) {
      sentence[i] = sentence[i][0].toUpperCase() + sentence[i].slice(1);
    }
    return sentence.join(' ');
  };
  const email = sessionStorage.getItem('email') || ''
  const acceptRejectTransaction = (status: string) => {
    setNote('');
    setLoading(true);
    updateTransactionStatus(
      email,
      status,
      trx_id,
      note
    )
      .then((response) => {
        setLoading(false);
        console.log(response.data.message);
        toast.success(response.data.message);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        toast.error(err.response.data.message);
      });
  };
  const [reasonText, setReasonText] = useState('');
  const [reasonTextError, setReasonTextError] = useState('');
  const [rejectLoading, setRejectLoading] = useState(false);
  const updateTxStatus = async () => {
    if (reasonText.trim() === '') {
      setReasonTextError('Required')
    } else {
      setReasonTextError('')
      setRejectLoading(true);
      try {
        const response = await updateTransactionStatus(email, 'REJECTED', trx_id, reasonText)
        console.log(response.data.message);
        toast.success(response.data.message);
        setStatusSetPopup(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
      setRejectLoading(false);
    }
  }
  const [statusSetPopup, setStatusSetPopup] = useState(false);
  const renderRejectPopup = () => {
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
                <p >Rejection Reason</p>
                <div className="input-holder">
                  <textarea className={"input-1 w-100 " + (reasonTextError ? 'err-border' : '')} value={reasonText} onChange={(e) => { setReasonText(e.target.value); setReasonTextError('') }}></textarea>
                </div>
                <Row>
                  <Col >
                    <button className="btn-3" disabled={Boolean(rejectLoading)} onClick={() => { updateTxStatus() }}>
                      {rejectLoading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                        <span className="login-txt"> Loading...</span></> : 'Confirm'}
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
  return (
    <>
      <Container fluid>
        <Header />
        <ToastContainer limit={1} />
        <div className="body-pad">
          <div className="d-flex align-items-center">
            <Link to="/comp-sign-transactions/compliance"><img src="assets/arrow-left.svg" alt="" width="24" /></Link>
            <h1 className="ml-4">Accept/Reject Transaction</h1>
          </div>
          <div className="form-holder">
            <div className="title-row">
              <h3 className="mb-1">{headLabel.toUpperCase()}</h3>
            </div>
            <Row>
              {values.map((value: any, index: number) => {
                return (
                  <Col md="6" key={index}>
                    <div className="input-holder left">
                      <p className="label">{titleCase(value[0])}</p>
                      <div className="input-1">
                        <p
                          style={{
                            fontSize: '12px',
                          }}
                        >
                          {typeof value[1] === 'string' ? value[1] : ''}
                        </p>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Row>
            {/* <h3 className="mb-1 mt-2">Proof of Transaction</h3>
            <Row>
              <Col md="6">
                <div className="d-flex mt-4">
                  <img src="assets/file.svg" alt="" height="24" className="mr-3" />
                  <p>Preview</p>
                </div>
              </Col>
              <Col md="6" className="d-flex justify-content-end">
                <p className="mr-2">*</p>
                <div className="comment-box">
                  <p>I have Accepted the Transaction</p>
                </div>
              </Col>
            </Row> */}

            <Row>
              <Col md="6">
                <div className="d-flex">
                  <button className="btn-3 mr-4 bg-positive" disabled={Boolean(Loading)}
                    onClick={() => {
                      if (headLabel.toUpperCase() === 'COMPLIANCE') {
                        if (trx_status === 'COMPLIANCE') {
                          acceptRejectTransaction('INREVIEW');
                        } else {
                          toast.error(
                            'You cannot Accept Transaction as Transaction is with Signatory A or B'
                          );
                        }
                      } else if (
                        headLabel.toUpperCase() === 'SIGNATORY-A' ||
                        headLabel.toUpperCase() === 'SIGNATORY-B'
                      ) {
                        if (trx_status === 'INREVIEW') {
                          if (headLabel.toUpperCase() === 'SIGNATORY-A') {
                            acceptRejectTransaction('SIGNATORY-B');
                          } else {
                            acceptRejectTransaction('SIGNATORY-A');
                          }
                        } else if (trx_status === 'SIGNATORY-A' || trx_status === 'SIGNATORY-B') {
                          acceptRejectTransaction('COMPLETED');
                        } else {
                          toast.error(
                            'You cannot Accept Transaction as Compliance hasnt verified yet'
                          );
                        }
                      }
                    }}
                  >
                    {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="login-txt"> Loading...</span></> : <p>Accept</p>}
                  </button>
                  {/* rejection button  */}
                  <button className="btn-3 bg-positive" onClick={() => { setStatusSetPopup(true) }} >
                    {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                      <span className="login-txt"> Loading...</span></> : <p>Reject</p>}
                  </button>
                </div>
              </Col>
              {/* <Col md="6" className="d-flex justify-content-end">
                  <div className="btn-3 ">
                    <p>Add Comment</p>
                  </div>
              </Col> */}
            </Row>
            <div className="line"></div>
            <Row>
              {
                trx_history.map((hist) => {
                  return (
                    <Col md="3">
                      <div className="auth-box">
                        <p className="title">Signatory B</p>
                        <p className="small mt-4">Status:</p>
                        <p className="accepted">Accepted</p>
                        {

                        }
                        <p className="small mt-4">Comment</p>
                        <p className="comment">
                          I have accepted the transaction
                        </p>
                      </div>
                    </Col>
                  );
                })
              }
            </Row>
            {renderRejectPopup()}
          </div>
        </div>
      </Container>
    </>
  );
};

export default SignatoryA;
