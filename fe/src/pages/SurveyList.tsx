import { apiSurveysList } from "../openapi"
import { createResource, For, Match, Show, Switch } from "solid-js";

export default () => {
    const [list] = createResource(
        async () => {
            const result = await apiSurveysList();
            if (result.data) {
                return result.data;
            }
            // XXX: not required?
            console.log(result.error);
            throw result.error;
        });

    return <>
        <Show when={list.loading}>
            <p>Загрузка...</p>
        </Show>
        <Switch>
            <Match when={list.error}>
                <p>Не удалось загрузить спиок анкет!</p>
            </Match>
            <Match when={list()}>
                <ul>
                    <For each={list()!}>{(item, _i) =>
                        <li>
                            <a href={`/view/${item.id}`}>{item.name} ({item.created})</a>
                        </li>
                    }</For>
                </ul>
            </Match>
        </Switch>
    </>
}