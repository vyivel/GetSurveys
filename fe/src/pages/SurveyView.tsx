import { useParams } from "@solidjs/router";
import { apiSurveysDestroy, apiSurveysRetrieve } from "../openapi"
import { createResource, Match, Show, Switch } from "solid-js";

export default () => {
    const params = useParams()
    const [survey] = createResource(params.id,
        async (id) => {
            const result = await apiSurveysRetrieve({
                path: { id: parseInt(id) }
            });
            if (result.data) {
                return result.data;
            }
            // XXX: not required?
            console.log(result.error);
            throw result.error;
        });

    return <>
        <Show when={survey.loading}>
            <p>Загрузка...</p>
        </Show>
        <Switch>
            <Match when={survey.error}>
                <p>Не удалось загрузить анкету!</p>
            </Match>
            <Match when={survey()}>
                <h2>info</h2>
                <p>name: {survey()!.name}</p>
                <p>poc: {survey()!.point_of_contact}</p>
                <p>phone: {survey()!.phone_number}</p>
                <p>email: {survey()!.email}</p>
                <p>systems: {survey()!.systems.join(", ")}</p>
                <h2>description</h2>
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
    </>
}