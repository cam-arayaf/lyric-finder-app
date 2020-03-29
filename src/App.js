import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from './components/Common/Header';
import Main from './components/Main';
import Lyrics from './components/Lyrics';
import NotFound from './components/NotFound';
import './assets/css/styles.css';

const App = () => (
    <BrowserRouter>
        <Header />
        <Switch>
			<Route exact path='/' component={ Main } />
			<Route path='/lyrics/track/:id' component={ Lyrics } />
			<Route component={ NotFound } />
		</Switch>
    </BrowserRouter>
);

App.displayName = 'App';

export default App;