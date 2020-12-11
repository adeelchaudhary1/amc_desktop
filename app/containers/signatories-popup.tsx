import React from 'react'
import { Modal } from 'react-bootstrap';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

import {
    Row,
    Col,
} from 'reactstrap';
interface IProps {
    setShowModal: Function
    setAmcSig: Function
    amcSig: string
    setAmcSigError : Function
}
const ConfirmModal: React.FC<IProps> = ({ setShowModal, setAmcSig, amcSig , setAmcSigError }: IProps) => {
    const [Loading, setLoading] = useState(false);
    const [panel, setPanel] = useState('Panel A');
    const [emailAdd, setEmailAdd] = useState('');
    const emailRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$");
    const [emailError, setEmailError] = useState('')
    const addEmailInList = () => {
        if (emailRegex.test(emailAdd) !== true) {
            setEmailError('Invalid Email')
        } else {
            setEmailError('')
            if (amcSig === '') {
                amcSig = emailAdd;
            } else {
                amcSig = amcSig + ' , ' + emailAdd;
            }
            setAmcSig(amcSig);
            setShowModal(false)
            setAmcSigError('')
        }
    }
    return (
        <Modal
            className="text-dark modal-pos modal-margin-top border-0"
            dialogClassName="modal60w"
            show={true}
        >
            <div className="modal-view">
                <Row >
                    <Col md="4">
                        <div className="input-holder mt-3">
                            <p className="label">Email</p>
                        </div>
                    </Col>
                    <Col md="8">
                        <div className="input-holder ">
                            <input type="text" className="input-1" value={emailAdd} onChange={(e) => {
                                setEmailAdd(e.target.value);
                                setEmailError('')
                            }}
                            />
                            {emailError ? <p className="error-labels error-mes">{emailError}</p> : ''}
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col md="4">
                        <div className="input-holder mt-3">
                            <p className="label">Select Panel</p>
                        </div>
                    </Col>
                    <Col md="8">
                        <div className="input-holder ">
                            <select className="input-1" value={panel} onChange={(e) => { setPanel(e.target.value) }}>
                                <option value='Panel A' defaultChecked>Panel A</option>
                                <option value='Panel B'>Panel B</option>
                            </select>
                        </div>
                    </Col>
                </Row>
                <div className="float-right">
                    <Row>
                        <Col >
                            <button className="btn-3" disabled={Boolean(Loading)} onClick={() => { addEmailInList() }}>
                                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                                    <span className="login-txt"> Loading...</span></> : <p>Confirm</p>}
                            </button>
                        </Col>
                        <Col>
                            <button className="btn-3" onClick={() => { setEmailAdd(''); setShowModal(false) }}>
                                Cancel
                            </button>
                        </Col>
                    </Row>
                </div>
            </div>
        </Modal>
    );
};
export default ConfirmModal;