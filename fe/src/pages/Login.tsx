import { createSignal, Show } from "solid-js";
import { apiLoginCreate } from "../openapi"

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
        <form onSubmit={submit}>
            <fieldset>
                <div>
                    <label for="username">Логин</label>
                    <input type="text" id="username" value={username()}
                        onInput={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label for="password">Пароль</label>
                    <input type="text" id="password" value={password()}
                        onInput={(e) => setPassword(e.target.value)} />
                </div>
            </fieldset>
            <button type="submit">Войти</button>
        </form>
    </>
}