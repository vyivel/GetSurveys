import { createSignal, Show } from "solid-js";
import { apiLoginCreate } from "../openapi"
import Form from "../components/Form";
import FormInputField from "../components/FormInputField";

export default () => {
    const [username, setUsername] = createSignal<string>('');
    const [password, setPassword] = createSignal<string>('');

    const [error, setError] = createSignal<string | undefined>();

    async function submit(e: Event) {
        e.preventDefault()
        const response = await apiLoginCreate({
            body: {
                username: username(),
                password: password()
            },
        });
        if (response.error) {
            setError(response.error.toString());
        } else {
            window.location.replace('/list');
        }
    }

    return <>
        <Show when={error()}>
            <p>
                Не удалось войти! Проверьте правильность ввода данных.
            </p>
        </Show>
        <Form submitName="Войти" onSubmit={submit}>
            <FormInputField label="Логин" value={username} setValue={setUsername} required />
            <FormInputField type="password" label="Пароль" value={password} setValue={setPassword} required />
        </Form>
    </>
}