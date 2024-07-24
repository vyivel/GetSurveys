import { ParentProps } from "solid-js"

import './Form.scss'

interface FormProps {
    submitName: string;
    onSubmit: (e: Event) => void;
}

export default (props: ParentProps<FormProps>) => {
    return <form class='form' onSubmit={(e: Event) => {
        e.preventDefault()
        props.onSubmit(e);
    }}>
        <fieldset class='form-fieldset'>
            {props.children}
        </fieldset>
        <button type="submit">{props.submitName}</button>
    </form>
}