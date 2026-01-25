import validator from "validator"

export interface Validation {
    args?: any,
    validWhen: boolean,
    field: string,
    method: ValidationMethod
    message?: string
}

export type ValidationMethod = keyof typeof validator | ((value: string, ...args: any[]) => boolean)

type FieldValidation = {
    isInvalid: boolean,
    message?:string | undefined
}

export type ValidationResult = {
    isValid: boolean
} & Record<string, FieldValidation>

export class FormValidator {
    validations: Validation[];
    constructor(validations: Validation[]){
        this.validations = validations
    }

    validate(initialState: any){
      const state = {...initialState}
      //bring the validations
      let validation = this.valid()
     //validations should be an array of objects
      this.validations.forEach(rule => {
        // string whatever value is in state for the field
        let fieldValue = state[rule.field].toString()
        // rule.args may not be defined and should be an array
        let args = rule.args || []
        //make flexible for less imports of validator. method is either string or function
        let validationMethod = typeof rule.method === "string" ?
                                 (validator[rule.method] as any) : rule.method
        //if the method doesn't return the boolean specified in the rule's validWhen prop
        if(validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
            //set the validation field with the matching field to invalid and the message
            validation[rule.field] = { isInvalid: true, message: rule.message }
            //set is valid to false
            validation.isValid = false
        }
      })
      //return the validation object
      return validation
    }

    valid(): ValidationResult{
        const validation: Record<string,FieldValidation> = {}
        this.validations.forEach(rule => {
            validation[rule.field] = { isInvalid: false, message: "" }
        })
        return { isValid: true, ...validation } as ValidationResult
    }
}