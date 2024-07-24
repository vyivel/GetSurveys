import { createResource, Show } from "solid-js";
import { apiLogoutCreate, apiSessionRetrieve } from "../openapi";

import './TopBar.scss'

export default () => {
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

    return <div class='topbar'>
        <span>Система анкетирования</span>
        <Show when={username()} fallback={
            <a href="/login">Войти в систему</a>
        }>
            <div class="topbar-logged-in">
                <span>
                    Вы вошли как {username()!}
                </span>
                <button onClick={logout}>Выйти</button>
            </div>
        </Show>
    </div>
}