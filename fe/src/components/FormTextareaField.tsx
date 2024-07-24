import { Accessor } from "solid-js";

import FormField from "./FormField";

interface FormTextareaFieldProps {
    label: string;
    required?: boolean;
    value: Accessor<string>
    setValue: (value: string) => void;
}

export default (props: FormTextareaFieldProps) => {
    return <FormField label={props.label} required={props.required}>{inputProps =>
        <textarea
            id={inputProps.id}
            class="form-field-textarea"
            value={props.value()}
            onInput={(e) => props.setValue(e.target.value)}
            required={props.required}
        />
    }</FormField>
}