import { Url } from "url"

export type ComponentTypes = 'BOX' | 'TEXT' | 'IMAGE'

export interface EditorComponents {
    id: string;
    type: ComponentTypes;
    children?: EditorComponents[];
    props?:any
}

export type setEditorComponent=(components:EditorComponents[])=>void