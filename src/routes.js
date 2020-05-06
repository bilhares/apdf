import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './pages/home/';
import Assinar from './pages/assinar-pdf'
import Juntar from './pages/juntar-pdf';
import Menu from './pages/menu';
import Dividir from './pages/dividir-pdf';
import Paginar from './pages/paginar-pdf';
import Inicio from './pages/inicio';
import About from './pages/about-us';


export default function Routes() {

    return (
        <div>
            <BrowserRouter >
                <Menu />
                <Switch>
                    <Route path="/" exact component={Inicio} />
                    <Route path="/about-us" component={About} />
                    {/* <Route path="/" exact component={Home} /> */}
                    {/* <Route path="/assinar-pdf" component={Assinar} /> */}
                    {/* <Route path="/juntar-pdf" component={Juntar} /> */}
                    {/* <Route path="/dividir-pdf" component={About} /> */}
                    {/* <Route path="/paginar-pdf" component={Paginar} /> */}
                </Switch>
            </BrowserRouter>
        </div>
    );
}