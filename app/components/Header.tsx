import React, { useState } from 'react';
import {
  Container,
  Nav,
  Navbar,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  NavItem,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavLink,
  ButtonDropdown,
} from 'reactstrap';
import { Dropdown } from 'react-bootstrap';
import { ipcRenderer } from "electron";
import { Link, useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();
  let [showToolbar, setShowToolbar] = useState(true);
  let [showTooltip, setShowTooltip] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [dropdownOpen, setOpen] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);
  React.useEffect(() => {
    ipcRenderer.on('navigate', (data: any, obj: any) => {
      history.replace(obj);
    });
    const role = sessionStorage.getItem('role') || '';
    const features = sessionStorage.getItem('features') || '';
    ipcRenderer.send('menu-item-show', { role, features });
  }, []);
  return (
    <>
      <Navbar expand="lg" className="">
        <NavbarBrand>
          <Link to="/dashboard" replace>Amc System</Link>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavbarBrand >
            <img src="assets/notification.svg" alt="" width="18" />
          </NavbarBrand>
          {/* <ButtonDropdown style={{
            background: 'transparent',
            border: 'none'
          }} isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
              <img src="assets/user.svg" alt="" width="18" />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem>
                <Link to="user-setting" replace>Settings</Link>
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem>
                <Link to="/" onClick={() => {
                  sessionStorage.clear();
                  ipcRenderer.send('logout', true);
                }} replace>
                  Logout
              </Link>
              </DropdownItem>
            </DropdownMenu>
          </ButtonDropdown> */}
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">
              <img src="assets/user.svg" alt="" width="18" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1"><Link to="user-setting" replace>Settings</Link></Dropdown.Item>
              <Dropdown.Item href="#/action-2"> <Link to="/" onClick={() => {
                  sessionStorage.clear();
                  ipcRenderer.send('logout', true);
                }} replace>
                  Logout
              </Link></Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Navbar>
    </>
  )
};

export default Header;