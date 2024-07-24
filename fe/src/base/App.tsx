import { ParentProps } from "solid-js";
import TopBar from "../components/TopBar";

import './App.scss'

export default (props: ParentProps) => {
    return <main>
        <header>
            <TopBar />
        </header>
        <div class="main-container">
            {props.children}
        </div>
    </main>
}