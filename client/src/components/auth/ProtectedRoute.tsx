import React from'react'
import {Route, Redirect} from'react-router-dom'
import auth from'./auth'
import {getUser} from './getUser'
interface IProps {
  exact?: boolean;
  path: string;
  component: React.ComponentType<any>;
}
export const ProtectedRoute: React.FC<IProps> = ({component: Component, ...rest})=>{
  return(
    <Route {...rest} render={
      (props) => {
        const user:any = getUser()
        if(user.position == 'admin'){
          return <Component {...props} />
        }else{
          return <Redirect to={
            {
              pathname: "/admin/login",
              state: {
                from: props.location
              }
            }
          } />
        }
      }
    }/>
  )
}