import { Component, createUniqueId } from "solid-js";

import './Form.scss'

export interface FormFieldProps {
    label: string;
    required?: boolean;
    children: Component<{ id: string }>;
}

export default (props: FormFieldProps) => {
    const id = createUniqueId();
    return <div class="form-field">
        <label for={id} class="form-field-label" data-required={props.required}>
            {props.label}
        </label>
        {props.children({ id })}
    </div>
}