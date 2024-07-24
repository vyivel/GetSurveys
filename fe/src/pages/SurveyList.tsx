import Page from "../components/Page";
import { apiSurveysList } from "../openapi"
import { createResource, For, Match, Show, Switch } from "solid-js";

export default () => {
    const [list] = createResource(
        async () => {
            const result = await apiSurveysList();
            if (result.data) {
                return result.data;
            }
            throw result.error;
        });

    return <Page heading="Список анкет">
        <Show when={list.loading}>
            <p>Загрузка...</p>
        </Show>
        <Switch>
            <Match when={list.error}>
                <p>Не удалось загрузить список анкет!</p>
            </Match>
            <Match when={list()}>
                <Show when={list()!.length > 0} fallback={
                    <p>
                        <i>Нет доступных анкет.</i>
                    </p>
                }>
                    <ul>
                        <For each={list()!}>{(item, _i) =>
                            <li>
                                <a href={`/view/${item.id}`}>
                                    Анкета от <q>{item.name}</q> ({item.email}, {item.phone_number})
                                </a>
                            </li>
                        }</For>
                    </ul>
                </Show>
            </Match>
        </Switch>
    </Page>
}