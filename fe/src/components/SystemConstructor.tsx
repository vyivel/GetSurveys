import { For } from "solid-js"
import { System } from "../types/System"
import SystemBox from "./SystemBox"

import './System.scss'

interface SystemConstructorProps {
    systems: Array<System>
}

export default (props: SystemConstructorProps) => {
    return <div class="system-constructor">
        <For each={props.systems}>{(system, _i) =>
            <SystemBox system={system} />
        }</For>
    </div>
}