import { useKeycloak } from "@react-keycloak/web"
import { isAdmin } from "./api/Helpers"
import { chatApi } from "./api/ChatApi"
import { Link, NavLink } from 'react-router-dom'
import { Container, Dropdown, Menu } from 'semantic-ui-react'
import { useEffect } from "react"

export default function Navbar(){
    useEffect(()=>{
      console.log(keycloak.hasRealmRole)
    },[])
    const { keycloak } = useKeycloak()
    const handleLogInOut = () => {
        if (keycloak.authenticated) {
          //props.history.push('/')
          keycloak.logout()
        } else {
          keycloak.login()
        }
      }
    
      const checkAuthenticated = () => {
        if (!keycloak.authenticated) {
          handleLogInOut()
        }
      }
    
      const getUsername = () => {
        return keycloak.authenticated && keycloak.tokenParsed && keycloak.tokenParsed.preferred_username
      }
    
      const getLogInOutText = () => {
        return keycloak.authenticated ? "Logout" : "Login"
      }
    
      const getAdminMenuStyle = () => {
        return keycloak.authenticated && isAdmin(keycloak) ? { "display": "block" } : { "display": "none" }
      }
    
    return(
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">CoolChat</a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a>{getUsername()}</a></li>
            <li><button className="btn" onClick={handleLogInOut}>{getLogInOutText()}</button></li>
            <li><button className="btn" onClick={() => chatApi.getUserExtrasMe(keycloak.token)}>get</button></li>
          </ul>
        </div>
      </div>
        
    )
}