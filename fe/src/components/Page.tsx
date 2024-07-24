import { ParentProps } from "solid-js";

interface PageProps {
    heading: string;
}

export default (props: ParentProps<PageProps>) => {
    return <>
        <h1>{props.heading}</h1>
        {props.children}
    </>
}
