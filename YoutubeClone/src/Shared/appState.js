import { observable, action, computed } from "mobx";
import { ApiCall } from "./ApiCall";
import { createContext } from "react";


class AppState 
{
  @observable SearchTerm = "";

  SetSearchTerm = (SearchTerm) => {
    this.SearchTerm = SearchTerm

  }
}

const AppStateContext = createContext(new AppState())
export default AppStateContext