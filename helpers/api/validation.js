const joiValidationHelper = (schema, body) => {
    const bodyObj = Object(body)
    const validationResult = schema.validate(bodyObj)
    return validationResult.error === undefined ? undefined : validationResult.error.details[0].message
}

export default joiValidationHelper