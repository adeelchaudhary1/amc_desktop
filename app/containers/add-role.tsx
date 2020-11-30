import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import { Container, Row, Col } from "reactstrap";
import { getFeatures, addRole } from "./../stores/services/role.service";
import Header from "./../components/Header";
import _ from "lodash";
import "./../../node_modules/react-checkbox-tree/lib/react-checkbox-tree.css";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const RoleInfo = () => {
  const history = useHistory();
  const [Loading, setLoading] = useState(false);
  let [name, setName] = useState('');
  let [description, setDescription] = useState('');
  let [checked, setChecked] = useState([]);
  let [expanded, setExpanded] = useState([-1]);
  let [nodes, setNodes] = useState([]);
  let [nameError, setNameError] = useState(false);
  let [descriptionError, setDescriptionError] = useState(false);
  let [featruesError, setFeaturesError] = useState(false);
  const [features, setFeatures] = useState([]);
  React.useEffect(() => {
    getFeatures(sessionStorage.getItem("email") || "")
      .then((response) => {
        console.log(response);
        setFeatures(response.data.features);
        response.data.features.unshift({
          id: -1,
          feature: "Trustee",
          parent_id: null,
        });
        for (let index = 0; index < response.data.features.length; index++) {
          if (response.data.features[index].parent_id === 0) {
            response.data.features[index].parent_id = -1;
          }
          response.data.features[index].value =
            response.data.features[index].id;
          response.data.features[index].label =
            response.data.features[index].feature;
        }
        var data = response.data.features;
        var root: any;
        const idMapping = data.reduce((acc: any, el: any, i: any) => {
          acc[el.id] = i;
          return acc;
        }, {});
        data.forEach((el: any) => {
          // Handle the root element
          if (el.parent_id === null) {
            root = el;
            return;
          }
          // Use our mapping to locate the parent element in our data array
          const parentEl = data[idMapping[el.parent_id]];
          // Add our current el to its parent's `children` array
          parentEl.children = [...(parentEl.children || []), el];
        });
        setNodes([root]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const addRoleBtn = () => {
    setNameError(false);
    setDescriptionError(false);
    setFeaturesError(false);
    setLoading(true);
    if (!name || name.trim() === "") {
      toast.error("Name is Required");
      setLoading(false);
      return;
    }
    if (!description || description.trim() === "") {
      toast.error('Description is Required');
      setLoading(false);
      return;
    }
    if (checked.length === 0) {
      toast.error('Please Select Features to proceed');
      setLoading(false);
      return;
    }
    const selected_features: any = [];
    for (let index = 0; index < checked.length; index++) {
      const feature = features.find(x => x.id === parseInt(checked[index]));
      if (feature) {
        selected_features.push(feature);
      }
    }
    addRole(sessionStorage.getItem("email") || "", name, description, JSON.stringify(selected_features))
      .then((response) => {
        setLoading(false);
        console.log(response);
        toast.success(response.data.message);
        setTimeout(function () {
          history.replace('/role-management');
        },3000);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        toast.error(err.response.data.message);
      })
  }
  return (
    <>
      <Container fluid>
        <Header />
        <ToastContainer/>
        <div className="body-pad">
          <h1> Add Role </h1>{" "}
          <div className="form-holder">
            <div className="title-row">
              <h3 className="mb-1"> Role Info </h3>
              <Link to="/role-management" className="t-3" replace>View All</Link>
            </div>{" "}
            <p className="t-3 mb-2">
              {" "}
              Please enter the following information to add a new Role{" "}
            </p>{" "}
            <Row>
              <Col md="6">
                <div className="input-holder left">
                  <p className="label"> Name </p>{" "}
                  <input className="input-1" onChange={(e) => {
                    setName(e.target.value);
                  }} />
                  
                </div>{" "}
                {
                    nameError === true ?
                      <p className="error-labels">Name is Required.</p>
                      : ''
                  }
              </Col>{" "}
            </Row>{" "}
            <Row>
              <Col md="6">
                <div className="input-holder left align-items-start">
                  <p className="label"> Description </p>{" "}
                  <textarea className="input-1 description-box" onChange={(e) => {
                    setDescription(e.target.value)
                  }}> </textarea>
                  
                </div>{" "}
                {
                    descriptionError === true ?
                      <p className="error-labels">Description is Required.</p>
                      : ''
                  }
              </Col>
            </Row>{" "}
            <div className="line"> </div>{" "}
            <h3 className="mb-1"> Assign Features </h3>{" "}
            <p className="t-3 mb-2"> Features </p>
            <Row className="mt-3">
              <CheckboxTree
                nodes={nodes}
                checked={checked}
                expanded={expanded}
                onCheck={(checked) => {
                  setChecked(checked)
                  console.log(checked);
                }}
                onExpand={(expanded) => setExpanded(expanded)}
                iconsClass="fa5"
              />
              {
                featruesError === true ?
                  <p className="error-labels">Select Features.</p>
                  : ''
              }
            </Row>{" "}
            <div className="d-flex">
              <Link className="btn-3 bg-negative" to="/role-management" replace>Cancel</Link>
              <button className="btn-3 ml-4" onClick={addRoleBtn} disabled={Boolean(Loading)}>
                {Loading ? <><span className="spinner-border login-txt spinner-border-sm" role="status" aria-hidden="true"></span>
                  <span className="login-txt"> Loading...</span></> : <p>Add Role</p>}
              </button>
            </div>{" "}
          </div>
        </div>{" "}
      </Container>{" "}
    </>
  );
};

export default RoleInfo;