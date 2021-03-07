//  routes/Navigation.js

// Librerias de ruteo
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import routes from "./routes";
// bucle- utilidades
import { map } from "lodash";

export default function Navigation(){
    return(
        <Router>
            <Switch>  
          { map(routes,(route,index)=>(
                  <Route
                  key={ index }
                  path={ route.path }
                  exact={ route.exact }
                  render={ (props)=>(
                  <route.layout>
                      <route.component { ...props }/>
                  </route.layout>
                    )}
                  />
              ))}
            </Switch>
        </Router>
    )
}