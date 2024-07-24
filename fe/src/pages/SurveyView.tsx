import { useParams } from "@solidjs/router";
import { apiSurveysDestroy, apiSurveysRetrieve } from "../openapi"
import { createResource, Match, Show, Switch } from "solid-js";
import Page from "../components/Page";

export default () => {
    const params = useParams()
    const [survey] = createResource(
        params.id,
        async (id) => {
            const result = await apiSurveysRetrieve({
                path: { id: parseInt(id) }
            });
            if (result.data) {
                return result.data;
            }
            throw result.error;
        });


    function getSystemsRepr() {
        const systems = survey()!.systems;
        console.log(systems);
        if (systems.length == 0) {
            return <i>отсутствуют или не указаны</i>;
        } else {
            return <>{systems.map((x) => x.toUpperCase()).join(", ")}</>
        }
    }

    return <Page heading="Просмотр анкеты">
        <a href="/list">Назад к списку</a>
        <Show when={survey.loading}>
            <p>Загрузка...</p>
        </Show>
        <Switch>
            <Match when={survey.error}>
                <p>Не удалось загрузить анкету!</p>
            </Match>
            <Match when={survey()}>
                <h2>Основная информация</h2>
                <p>Название компании: {survey()!.name}</p>
                <p>Контактное лицо: {survey()!.point_of_contact}</p>
                <p>Номер телефона: {survey()!.phone_number}</p>
                <p>Электронная почта: {survey()!.email}</p>
                <p>Адрес: {survey()!.address ?? <i>не указан</i>}</p>
                <p>Системы на предприятии: {getSystemsRepr()}</p>
                <h2>Описание заявки</h2>
                <p>{survey()!.description}</p>
                <button onClick={async () => {
                    const response = await apiSurveysDestroy({
                        path: { id: parseInt(params.id) }
                    })
                    if (response.data) {
                        window.location.replace('/list')
                    }
                }}>
                    Удалить
                </button>
            </Match>
        </Switch>
    </Page>
}