/* @refresh reload */
import { render } from 'solid-js/web'
import Cookies from 'js-cookie'
import { Route, Router } from "@solidjs/router";

import { client, createClient } from '@hey-api/client-fetch';

import SurveyForm from './pages/SurveyForm';
import SurveyView from './pages/SurveyView';
import SurveyList from './pages/SurveyList';
import Login from './pages/Login';
import App from './base/App';
import NotFound from './pages/NotFound';

import './index.scss'
import SurveyThanks from './pages/SurveyThanks';

createClient({
    baseUrl: import.meta.env.VITE_API_BASE,
    credentials: 'include',
});

// CSRF
client.interceptors.request.use((request, _options) => {
    let token = Cookies.get('csrftoken');
    if (token) {
        request.headers.set('x-csrftoken', token);
    }
    return request;
})

render(() => (
    <Router root={App}>
        <Route path='/' component={SurveyForm} />
        <Route path='/thanks' component={SurveyThanks} />
        <Route path='/login' component={Login} />
        <Route path='/list' component={SurveyList} />
        <Route path='/view/:id' component={SurveyView} matchFilters={{
            id: /^\d+$/,
        }} />
        <Route path="*" component={NotFound} />
    </Router>
), document.getElementById('root')!);