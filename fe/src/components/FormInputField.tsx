import { Accessor } from "solid-js";
import FormField from "./FormField";

interface FormInputFieldProps {
    label: string;
    required?: boolean;
    type?: string;
    value: Accessor<string>
    setValue: (value: string) => void;
}

export default (props: FormInputFieldProps) => {
    return <FormField label={props.label} required={props.required}>{inputProps =>
        <input
            id={inputProps.id}
            class="form-field-input"
            type={props.type}
            value={props.value()}
            onInput={(e) => props.setValue(e.target.value)}
            required={props.required}
        />
    }</FormField>
}