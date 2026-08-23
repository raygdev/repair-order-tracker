export interface FormFieldOption {
    label: string,
    value: string
}

export interface FormField {
    label: string,
    type: string,
    name: string
    value?: any,
    placeHolder?: string
    defaultValue?: any
    step?: `${number}.${number}` | `${number}.${number}${number}` 
    options?: FormFieldOption[]
}

export interface Form {
    title: string,
    id?: string,
    method: 'get' | 'put' | 'post' | 'patch' | 'delete',
    action: string,
    fields: FormField[]
    encType: EncType
}

export type EncType = 'application/json';