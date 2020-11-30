import React from 'react';
import Header from './../components/Header';
import { useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useHistory } from "react-router-dom";
import {
  Container,
  Col,
  Row
} from 'reactstrap';
import { getAmc, updateAmcStatus } from './../stores/services/amc.service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import ReactTooltip from 'react-tooltip';

const FundList = () => {
  const history = useHistory();
  const email = sessionStorage.getItem('email') || '';
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState<any>([]);
  React.useEffect(() => {
    const getBankList = async () => {
      setLoading(true);
      try {
        const response = await getAmc(email);
        setData(response.data.data)
        setSearchValue('');
      } catch (error) {
        toast.error(error.response.data.message[0]);
      }
      setLoading(false);
    }
    getBankList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  React.useEffect(() => {
    if (data) {
      let i;
      res.length = 0;
      setRes(res)
      for (i = 0; i < data.length; i++) {
        res.push(data[i]);
        setRes(res)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  const [res, setRes] = useState<any>([]);
  const [searchValue, setSearchValue] = useState('');
  function myFunction(e: any) {
    res.length = 0;
    setRes(res);
    var filter, td, i;
    filter = e.target.value;
    for (i = 0; i < data.length; i++) {
      td = data[i].name;
      if (td) {
        if (td.toUpperCase().indexOf(filter.toUpperCase()) > -1) {
          res.push(data[i]);
          setRes(res)
        } else {

        }
      }
    }
  }
  const getBankListUpdated = async () => {
    setLoading(true);
    try {
      const response = await getAmc(email);
      setData(response.data.data);
      // setRes(response.data.data);
      setSearchValue('');
    } catch (error) {
      toast.error(error.response.data.message[0]);
    }
    setLoading(false);
  }
  const [statusSetPopup, setStatusSetPopup] = useState(false);
  const [currentAmcStatus, setCurrentAmcStatus] = useState('');
  const [code, setCode] = useState('');
  const [amcLoading, setAmcLoading] = useState(false);
  const updateStatus = async () => {
    setAmcLoading(true);
    let status = '';
    if (currentAmcStatus === 'active') {
      status = 'deactive'
    } else {
      status = 'active'
    }
    try {
      const response = await updateAmcStatus(email, code, status)
      toast.success(response.data.message);
      setStatusSetPopup(false);
      getBankListUpdated();
    } catch (error) { }
    setAmcLoading(false);
  }
  const renderComponents = () => {
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
                    {currentAmcStatus === 'active' ? <img src="assets/ban.svg" alt="" width="70" /> : <img src="assets/check.svg" alt="" width="70" />}
                    <h1 className="pb-3">Are You Sure?</h1>
                        Are you sure you want to {currentAmcStatus === 'active' ? 'Deactivate' : 'Activate'} this AMC?
                  </div>
                </Row>
                <Row>
                  <Col >
                    <button className="btn-3" disabled={Boolean(amcLoading)} onClick={() => { updateStatus() }}>
                      {amcLoading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
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
    return res.map((items: any, index: any) => {
      return (
        <tr key={index}>
          <td>{items.name}</td>
          <td>{items.concerned_officer}</td>
          <td>{items.subtitute_concerned_officer}</td>
          <td className="captilize">{items.status}</td>
          <td className="d-flex justify-content-center"
            onClick={() => {
              setStatusSetPopup(true);
              setCurrentAmcStatus(items.status);
              setCode(items.amc_code)
            }}
          >
            {items.status === 'active' ?
              <img src="assets/ban.svg" alt="" width="16" /> : <img src="assets/check.svg" alt="" width="16" />}
          </td>
          <td>
            <img src="assets/view.svg" onClick={() => {
              sessionStorage.setItem('amcObj', JSON.stringify(items));
              history.replace('/view-amc')
            }} alt="" width="16" />
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
          <div className="d-flex align-items-center">
            <Link to="/setup"><img src="assets/arrow-left.svg" alt="" width="24" /></Link>
            <h1 className="ml-4">AMC Listing</h1>
          </div>
          {!Loading ?
            <div className="form-holder">
              <div className="input-holder">
                <div className="input-1">
                  <ReactTooltip textColor='white' backgroundColor='#1c5556' effect="float" />
                  <input type="search" id="myInput" className="input-1" data-tip="Amc Name" value={searchValue} onChange={(e) => {
                    setSearchValue(e.target.value);
                    myFunction(e);
                  }} />
                  <div className="date"><img src="assets/search.svg" alt="" width="16" /></div>
                </div>
              </div>
              <table className="table my-table" id="myTable" >
                <thead>
                  <tr>
                    <th>Name for AMC</th>
                    <th>Concerned Officer</th>
                    <th>Substitute Concerned Officer</th>
                    <th>Status</th>
                    <th className="center">Action</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody id="myUL">
                  {renderData()}
                </tbody>
              </table>
            </div>
            :
            <div className="d-flex">
              <div className="spinner-border spiner-xp mt-5" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>}
          {renderComponents()}
        </div>
      </Container>
    </>
  )
};

export default FundList;