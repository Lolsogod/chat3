import { useKeycloak } from "@react-keycloak/web"
import { isAdmin } from "./api/Helpers"
import { Link, NavLink } from 'react-router-dom'
import { Container, Dropdown, Menu } from 'semantic-ui-react'

export default function Navbar(){
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
        <Link to={"/login"} onClick={handleLogInOut}>{getLogInOutText()}</Link>
    )
}