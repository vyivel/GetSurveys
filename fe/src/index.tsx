/* @refresh reload */
import { Component, ParentProps } from 'solid-js';
import { render } from 'solid-js/web'
import { Route, Router } from "@solidjs/router";

import { createClient } from '@hey-api/client-fetch';

import SurveyForm from './pages/SurveyForm';
import SurveyView from './pages/SurveyView';
import SurveyList from './pages/SurveyList';
import Login from './pages/Login';

createClient({
    // TODO: load from env
    baseUrl: 'http://localhost:8000',
    credentials: 'include',
});


// TODO: move out
const App: Component<ParentProps> = props => (
    // TODO: move styles out
    <div style="width: 100%; display: flex; flex-direction: column; align-items: center;">
        <main>
            <h1>Анкета</h1>
            {props.children}
        </main>
    </div>
)

render(() => (
    <Router root={App}>
        <Route path='/new' component={SurveyForm} />
        <Route path='/login' component={Login} />
        <Route path='/list' component={SurveyList} />
        <Route path='/view/:id' component={SurveyView} matchFilters={{
            id: /^\d+$/,
        }} />
        <Route path="*" component={() => <p>404</p>} />
    </Router>
), document.getElementById('root')!);