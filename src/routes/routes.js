//  routes/routes.js

// Componentes
import Home  from "../pages/Home";
import Error404  from "../pages/Error404";
import User  from "../pages/User";
import LayaoutBasic from "../layouts/LayaoutBasic";

//Lista de rutas objetos
const routes = [
    {
        path:"/",
        component: Home,
        exact:true,
        layout: LayaoutBasic
    },
    {
        path:"/:username",
        component: User,
        exact:true,
        layout: LayaoutBasic
    },
    {
        component: Error404,
        layout: LayaoutBasic
    }
];

export default routes;