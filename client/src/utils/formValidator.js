import validator from "validator"


export class FormValidator {

    constructor(validations){
        this.validations = validations
    }

    validate(state){
      //bring the validations
    }

    valid(){
        const validation = {}
        this.validations.map(rule => {
            validation[rule.field] = { isInvalid: false, message: "" }
        })
        return { isValid: true, ...validation}
    }
}