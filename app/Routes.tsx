/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import HomePage from './containers/HomePage';
import LoginPage from './containers/LoginPage';
import ForgotPasswordPage from './containers/ForgotPasswordPage';
import DashboardPage from './containers/DashboardPage';
import TXNTypePage from './containers/txn-type';
import SaleOfUnit from './containers/sale-of-unit'
import GainRealization from './containers/gain-realization'
import ConversionUnit from './containers/conversion-unit'
import AcceptReject from './containers/accept-reject';
import AddUser from './containers/add-user';
import EditUser from './containers/edit-user';
import BankChanges from './containers/bank-charges';

import CashDividend from './containers/cash-dividend';
import Compliance from './containers/compliance';
// import Dash from './containers/dashboard';
import EquitySettlement from './containers/equity-settlement';
import AMCList from './containers/amc-listing';
import Inflow from './containers/inflow';
import Maturity from './containers/maturity';
import MoneyMarket from './containers/money-market';
import NatureList from './containers/nature-listing';
import Outflow from './containers/outflow';
import PendingTransactions from './containers/pending-transactions';
import RejectedTransactions from './containers/rejected-transactions';
import TransactionListing from './containers/transaction-listing';
import Redemption from './containers/redemption';
import RefundPayment from './containers/refund-payment';
import RoleManage from './containers/role-manage';
import SignatoryA from './containers/signatory-a';
// import SignatoryB from './containers/signatory-b';
import ComplianceSignatoryTransactions from './containers/comp-sign-listing';
import TransferFund from './containers/transfer-fund';
import UserManage from './containers/user-manage';
import AddRole from './containers/add-role'
import EditRole from './containers/edit-role'
import UserSetting from './containers/user-setting'
import SetupNature from './containers/setup-nature'
import SetupCgt from './containers/cgt-transaction'
import ViewAmc from './containers/view-amc';
import ViewFund from './containers/view-fund';
import AmcClient from './containers/amc-client';
import OfficerListing from './containers/officer-listing';
import AuthorizerListing from './containers/authorizer-listing';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route exact path="/officer-listing" component={OfficerListing} />
        <Route exact path="/authorizer-listing" component={AuthorizerListing} />
        <Route React path="/setup/view-all" component={AMCList} />
        <Route exact path="/setup-nature/view-all" component={NatureList} />
        <Route exact path="/add-role" component={AddRole} />
        <Route exact path="/edit-role" component={EditRole} />
        <Route exact path="/edit-user" component={EditUser} />
        <Route exact path="/redemptionbank" component={Redemption} />
        <Route exact path="/cashdividend" component={CashDividend} />
        <Route exact path="/fundtransfer" component={TransferFund} />
        <Route exact path="/equitysettlement" component={EquitySettlement} />
        <Route exact path="/profit" component={BankChanges} />
        <Route exact path="/outflow" component={Outflow} />
        <Route exact path="/inflow" component={Inflow} />
        <Route exact path="/refundpayment" component={RefundPayment} />
        <Route exact path="/moneymarketsettlement" component={MoneyMarket} />
        <Route exact path="/maturity" component={Maturity} />
        <Route exact path="/pending-transactions" component={PendingTransactions} />
        <Route exact path="/rejected-transactions" component={RejectedTransactions} />
        <Route exact path="/transaction-listing" component={TransactionListing} />
        <Route exact path="/accept-reject" component={AcceptReject} />
        <Route exact path="/compliance" component={Compliance} />
        <Route exact path="/signatory-a/:type" component={SignatoryA} />
        <Route exact path="/comp-sign-transactions/:type" component={ComplianceSignatoryTransactions} />
        <Route exact path="/add-user" component={AddUser} />
        <Route exact path="/user-setting" component={UserSetting} />
        <Route exact path="/setup-nature" component={SetupNature} />
        <Route exact path="/saleofunit" component={SaleOfUnit} />
        <Route exact path="/gainrealization" component={GainRealization} />
        <Route exact path="/unitconversion" component={ConversionUnit} />
        <Route exact path="/cgt" component={SetupCgt} />
        <Route exact path="/txn-type" component={TXNTypePage} />
        <Route exact path="/role-management" component={RoleManage} />
        <Route exact path="/user-management" component={UserManage} />
        <Route exact path="/view-amc" component={ViewAmc} />
        <Route exact path="/view-fund" component={ViewFund} />
        <Route exact path="/dashboard" component={DashboardPage} />
        <Route exact path="/forgot-password" component={ForgotPasswordPage} />
        <Route exact path="/amc-client" component={AmcClient} />
        <Route path={routes.HOME} component={LoginPage} />
      </Switch>
    </App>
  );
}
