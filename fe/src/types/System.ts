export interface System {
    id: string;
    name: string;
    value: () => boolean,
    setValue: (value: boolean) => void,
}