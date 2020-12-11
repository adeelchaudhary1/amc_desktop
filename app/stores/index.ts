import  { createContext, useContext } from "react";
import { action, observable } from "mobx";
import { LocalStoragePersistanceService, PersistanceService } from "../utils/local.storage";
/* Store start */
export class Store {
  private localStorage : PersistanceService
  @observable private token: string
 
  

  constructor() {
      this.localStorage = new LocalStoragePersistanceService()
      this.token = this.localStorage.getSavedState()
  }
 
  @action
  setToken(_token: string) {
    console.log('INSIDE SETTING TOKEN---======', _token)
    this.token = _token;
    this.localStorage.persistState(_token)
  }

  @action
  clearToken() {
    this.token = '';
    this.localStorage.clearSavedState()
  }

  getToken(): string {
    return this.token
  }
}
/* Store end */
 
/* Store helpers */
export const StoreContext = createContext(new Store());
 
/* Hook to use store in any functional component */
export const useStore = () => useContext(StoreContext);
 
export const storeInstance = new Store();