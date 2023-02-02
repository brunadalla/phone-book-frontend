import { Switch } from "react-router-dom"
import { Router } from "./Router"

import { Login } from "../pages/Login"

export const Routes = () => {
  
  return (
    <Switch>
      <Router exact path='/' component={Login} />
    </Switch>
  )
}