import { Accessor, createSignal, createUniqueId, For } from "solid-js"
import { apiSurveysCreate } from "../openapi"

import './SurveyForm.scss'

interface FormFieldProps {
    type: string;
    label: string;
    value: Accessor<string>;
    setValue: (value: string) => void;
    required?: boolean;
}

const FormField = (props: FormFieldProps) => {
    const id = createUniqueId();
    return <div class="field">
        <label for={id}>{props.label}</label>
        <input type={props.type} id={id} value={props.value()} onInput={(e) => props.setValue(e.target.value)} required={props.required} />
    </div>
}

interface System {
    id: string;
    name: string;
    value: () => boolean,
    setValue: (value: boolean) => void,
}

const makeSystem = (id: string, name: string): System => {
    const [value, setValue] = createSignal<boolean>(false);
    return { id, name, value, setValue };
}

interface SystemBoxProps {
    system: System;
}

const SystemBox = (props: SystemBoxProps) => {
    const id = createUniqueId();
    return <div id={props.system.id} class="system-box">
        <input type="checkbox" id={id} checked={props.system.value()} onInput={(e) => props.system.setValue(e.target.checked)} />
        <label for={id}>{props.system.name}</label>
    </div>
}

export default () => {
    const [name, setName] = createSignal<string>('')
    const [pointOfContact, setPointOfContact] = createSignal<string>('')
    const [phoneNumber, setPhoneNumber] = createSignal<string>('')
    const [description, setDescription] = createSignal<string>('')
    const [email, setEmail] = createSignal<string>('')
    const [address, setAddress] = createSignal<string>('')

    const systems = [
        makeSystem("erp", "ERP"),
        makeSystem("mes", "MES"),
        makeSystem("wms", "WMS"),
        makeSystem("qcs", "Система контроля качества"),
        makeSystem("da", "Система электронного документооборота"),
        makeSystem("iot", "IoT-платформа"),
        makeSystem("crm", "CRM"),
        makeSystem("pa", "Предиктивная аналитика"),
        makeSystem("rl", "Роботы-логисты"),
        makeSystem("bi", "BI-платформа"),
        makeSystem("hrm", "HRM"),
        makeSystem("pacs", "СКУД"),
    ]

    async function submit(e: Event) {
        e.preventDefault();
        const response = await apiSurveysCreate({
            body: {
                name: name(),
                point_of_contact: pointOfContact(),
                phone_number: phoneNumber(),
                description: description(),
                email: email(),
                address: address(),
                systems: systems.filter((x) => x.value()).map((x) => x.id),

                id: 0, // read-only
                url: "", // read-only
                created: "" // read-only
            }
        });
        if (response.data) {
            window.location.replace('/new')
        }
    }

    return <form onSubmit={submit}>
        <fieldset class="fieldset">
            <FormField type="text" label="Название компании" value={name} setValue={setName} required />
            <FormField type="text" label="Контактное лицо" value={pointOfContact} setValue={setPointOfContact} required />
            <FormField type="tel" label="Номер телефона" value={phoneNumber} setValue={setPhoneNumber} required />
            <FormField type="email" label="Электронная почта" value={email} setValue={setEmail} required />
            <FormField type="text" label="Адрес компании" value={address} setValue={setAddress} />
            <div class="field">
                <label for='desc'>Описание заявки</label>
                <textarea id='desc' value={description()} onInput={(e) => setDescription(e.target.value)} required />
            </div>
            <div class="system-constructor">
                <For each={systems}>{(system, _) =>
                    <SystemBox system={system} />
                }</For>
            </div>
        </fieldset>
        <button type="submit">Отправить</button>
    </form>
}