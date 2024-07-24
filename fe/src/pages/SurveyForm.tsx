import { createSignal } from "solid-js"
import { apiSurveysCreate } from "../openapi"

import Form from "../components/Form";
import FormInputField from "../components/FormInputField";
import FormTextareaField from "../components/FormTextareaField";
import SystemConstructor from "../components/SystemConstructor";
import { System } from "../types/System";
import Page from "../components/Page";

const makeSystem = (id: string, name: string): System => {
    const [value, setValue] = createSignal<boolean>(false);
    return { id, name, value, setValue };
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

    async function submit(_e: Event) {
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
            window.location.replace('/thanks')
        }
    }

    return <Page heading="Анкета">
        <Form submitName="Отправить" onSubmit={submit}>
            <FormInputField label="Название компании" value={name} setValue={setName} required />
            <FormInputField label="Контактное лицо" value={pointOfContact} setValue={setPointOfContact} required />
            <FormInputField type="tel" label="Номер телефона" value={phoneNumber} setValue={setPhoneNumber} required />
            <FormInputField type="email" label="Электронная почта" value={email} setValue={setEmail} required />
            <FormInputField label="Адрес компании" value={address} setValue={setAddress} />
            <FormTextareaField label="Описание заявки" value={description} setValue={setDescription} required />
            <div>
                <p>
                    Выберите системы, используемые на предприятии (по желанию):
                </p>
                <SystemConstructor systems={systems} />
            </div>
        </Form>
    </Page>
}