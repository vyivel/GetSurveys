import { createResource, ParentProps, Show } from "solid-js";
import { apiLogoutCreate, apiSessionRetrieve } from "../openapi";


export default (props: ParentProps) => {
    const [username] = createResource(
        async () => {
            const result = await apiSessionRetrieve();
            return result.data?.username;
        }
    );

    async function logout() {
        const response = await apiLogoutCreate();
        if (response.data) {
            window.location.replace('/login');
        }
    }

    // TODO: move styles out
    return <main>
        <div style="display: flex; flex-direction: row">
            <Show when={username()} fallback={
                <a href="/login">Войти в систему</a>
            }>
                <span>
                    Вы вошли как {username()!} | <button onClick={logout}>Выйти</button>
                </span>
            </Show>
        </div>
        {props.children}
    </main >
}