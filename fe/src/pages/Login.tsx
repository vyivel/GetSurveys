import { apiLoginCreate, apiLogoutCreate } from "../openapi"

export default () => {
    return <>
        <button onClick={() => {
            apiLoginCreate({
                body: {
                    // TODO
                    username: "admin",
                    password: "admin",
                }
            })
        }}>in</button>
        <button onClick={() => {
            apiLogoutCreate()
        }}>out</button>
    </>
}