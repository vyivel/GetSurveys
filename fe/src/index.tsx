/* @refresh reload */
import { render } from 'solid-js/web'
import { Route, Router } from "@solidjs/router";

import { Component, ParentProps } from 'solid-js';
import SurveyForm from './pages/SurveyForm';

const App: Component<ParentProps> = props => (
    <>
        <h1>meow :3</h1>
        {props.children}
    </>
)

render(() => (
    <Router root={App}>
        <Route path='new' component={SurveyForm} />
    </Router>
), document.getElementById('root')!);