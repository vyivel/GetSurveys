import { defineConfig } from '@hey-api/openapi-ts'

export default defineConfig({
    input: '../openapi.yaml',
    output: 'src/openapi',
    client: '@hey-api/client-fetch',
})