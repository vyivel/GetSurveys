import { Accessor, createSignal } from "solid-js"
import { apiSurveysCreate } from "../client"

export default () => {
    const [name, setName] = createSignal<string>('')
    const [pointOfContact, setPointOfContact] = createSignal<string>('')
    const [phoneNumber, setPhoneNumber] = createSignal<string>('')
    const [description, setDescription] = createSignal<string>('')
    const [email, setEmail] = createSignal<string>('')
    const [address, setAddress] = createSignal<string>('')

    function submit(e) {
        apiSurveysCreate({
            requestBody: {
                name: name(),
                point_of_contact: pointOfContact(),
                phone_number: phoneNumber(),
                description: description(),
                email: email(),
                address: address(),
                id: 0, // read-only
                url: "", // read-only
                created: "" // read-only
            }
        })
        e.preventDefault()
    }

    function field(id: string, type: string, label: string, value: Accessor<string>, setValue: (value: string) => void) {
        return <>
            <label for={id}>{label}</label>
            <input type={type} id={id} value={value()} onInput={(e) => setValue(e.target.value)} />
        </>
    }

    // TODO: make pretty
    return <form onSubmit={submit}>
        {field("name", "text", "Название компании", name, setName)}
        {field("point_of_contact", "text", "Контактное лицо", pointOfContact, setPointOfContact)}
        {field("phone_number", "number", "Номер телефона", phoneNumber, setPhoneNumber)}
        {field("email", "email", "Электронная почта", email, setEmail)}
        {field("address", "text", "Адрес компании", address, setAddress)}
        <label for='desc'>Описание заявки</label>
        <textarea id='desc' value={description()} onInput={(e) => setDescription(e.target.value)} />
        <button type="submit">Отправить</button>
    </form>
}