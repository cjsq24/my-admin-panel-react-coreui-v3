import React from 'react'

import Login from './views/Login'
import Profile from './views/profile'

//const Login = React.lazy(() => import('./views/Login'))
const Error404 = React.lazy(() => import('./views/Error404'))
const Home = React.lazy(() => import('./views/Home'))
const Dashboard = React.lazy(() => import('./views/Dashboard'))
const Notes = React.lazy(() => import('./views/notes'))

//const Profile = React.lazy(() => import('./views/profile'))
const Countries = React.lazy(() => import('./views/countries'))
const CountryCreate = React.lazy(() => import('./views/countries/Create'))
const CountryUpdate = React.lazy(() => import('./views/countries/Update'))
const States = React.lazy(() => import('./views/states'))
const StateCreate = React.lazy(() => import('./views/states/Create'))
const StateUpdate = React.lazy(() => import('./views/states/Update'))
const Cities = React.lazy(() => import('./views/cities'))
const CityCreate = React.lazy(() => import('./views/cities/Create'))
const CityUpdate = React.lazy(() => import('./views/cities/Update'))
const Users = React.lazy(() => import('./views/users'))
const UserCreate = React.lazy(() => import('./views/users/Create'))
const UserUpdate = React.lazy(() => import('./views/users/Update'))
const Menus = React.lazy(() => import('./views/menus'))
const MenuCreate = React.lazy(() => import('./views/menus/Create'))
const MenuUpdate = React.lazy(() => import('./views/menus/Update'))
const Roles = React.lazy(() => import('./views/roles'))
const RoleCreate = React.lazy(() => import('./views/roles/Create'))
const RoleUpdate = React.lazy(() => import('./views/roles/Update'))

const routes = [
  { path: '/login', name: 'Login', component: Login, type: 'public' },
  //{ path: '/', exact: true, name: 'Login', component: Login, type: 'public' },
  { path: '/login', exact: true, name: 'Login', component: Login, type: 'public' },
  { path: '/home', name: 'Home', component: Home, type: 'public' },
  { path: '/', exact: true, name: 'Dashboard', component: Dashboard, type: 'private' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, type: 'private' },
  { path: '/notes', name: 'Notes', component: Notes, type: 'private' },

  { path: '/profile', name: 'Profile', component: Profile, type: 'private' },
  //COUNTRIES
  { path: '/countries', name: 'Countries', exact: true, component: Countries, type: 'private' },
  { path: '/countries/create', name: 'Create', component: CountryCreate, type: 'private' },
  { path: '/countries/update', name: 'Update', component: CountryUpdate, type: 'private' },
  //STATES
  { path: '/states', name: 'States', exact: true, component: States, type: 'private' },
  { path: '/states/create', name: 'Create', component: StateCreate, type: 'private' },
  { path: '/states/update', name: 'Update', component: StateUpdate, type: 'private' },
  //CITIES
  { path: '/cities', name: 'Cities', exact: true, component: Cities, type: 'private' },
  { path: '/cities/create', name: 'Create', component: CityCreate, type: 'private' },
  { path: '/cities/update', name: 'Update', component: CityUpdate, type: 'private' },
  //USERS
  { path: '/users', name: 'Users', exact: true, component: Users, type: 'private' },
  { path: '/users/create', name: 'Create', component: UserCreate, type: 'private' },
  { path: '/users/update', name: 'Update', component: UserUpdate, type: 'private' },
  //MENUS
  { path: '/menus', name: 'Menus', exact: true, component: Menus, type: 'private' },
  { path: '/menus/create', name: 'Create', component: MenuCreate, type: 'private' },
  { path: '/menus/update', name: 'Update', component: MenuUpdate, type: 'private' },
  //ROLES
  { path: '/roles', name: 'Roles', exact: true, component: Roles, type: 'private' },
  { path: '/roles/create', name: 'Create', component: RoleCreate, type: 'private' },
  { path: '/roles/update', name: 'Update', component: RoleUpdate, type: 'private' },
  
  { path: '*', component: Error404 }
]

export default routes