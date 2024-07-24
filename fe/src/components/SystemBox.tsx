import { createUniqueId } from "solid-js";
import { System } from "../types/System";

interface SystemBoxProps {
    system: System;
}

export default (props: SystemBoxProps) => {
    const id = createUniqueId();
    return <div id={props.system.id} class="system-box">
        <input class="system-box-checkbox" type="checkbox" id={id} checked={props.system.value()} onInput={(e) => props.system.setValue(e.target.checked)} />
        <label class="system-box-label" for={id}>{props.system.name}</label>
    </div>
}