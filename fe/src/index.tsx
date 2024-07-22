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

createClient({
    // TODO: load from env
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
});

client.interceptors.request.use((request, _options) => {
    let token = Cookies.get('csrftoken');
    if (token) {
        request.headers.set('x-csrftoken', token);
    }
    return request;
})

// TODO: move out

render(() => (
    <Router root={App}>
        <Route path='/new' component={SurveyForm} />
        <Route path='/login' component={Login} />
        {/* <Route path='/logout' component={Logout} /> */}
        <Route path='/list' component={SurveyList} />
        <Route path='/view/:id' component={SurveyView} matchFilters={{
            id: /^\d+$/,
        }} />
        <Route path="*" component={() => <p>404</p>} />
    </Router>
), document.getElementById('root')!);