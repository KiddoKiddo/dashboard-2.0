import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter, Route } from 'react-router-dom';

// Style for overall of the page
import './index.css'

// Bootstrap (included here as used for all pages)
import 'bootstrap/dist/css/bootstrap.css';

// Individual pages
import SensorsDashboard from './SensorsDashboard'
import QueryDashboard from './QueryDashboard'

// The wrapper for all the pages.
// Define routes and individual pages below
const MainLayout = () => (
  <div>       
    <Route path="/sensor" component={ SensorsDashboard }/>
    <Route path="/query" component={ QueryDashboard }/>
  </div>
)

ReactDOM.render(
    <BrowserRouter>
        <MainLayout />
    </BrowserRouter>
, document.getElementById('root'));