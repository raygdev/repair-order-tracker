import { body } from "express-validator";

export const validateRepairOrderCreation = [
  validateVin(),
  validateRoNumber,
  validateCreatedOn(),
  sanitizeOptionalNotes(),
  validateIsWarranty()
]

export function validateVin() {
  return  body('vin')
    .trim()
    .notEmpty()
    .bail()
    .withMessage('vin is required')
    .isLength({ min: 17, max: 17 })
    .bail()
    .withMessage('vin must be 17 characters in length')
    .custom(value => /^[a-np-z0-9]{17}/ig.test(value))
    .withMessage('invalid vin')
}

export function validateRoNumber() {
  return body('ro_number')
    .notEmpty()
    .bail()
    .withMessage('ro_number is required')
    .isInt()
    .withMessage('ro_number must be a number')
}

export function validateCreatedOn() {
  return  body('created_on')
    .optional()
    .isDate()
    .bail()
    .withMessage('created_on should be a valid date')
}

export function sanitizeOptionalNotes() {
  return body('notes')
    .optional()
    .escape()
}

export function validateIsWarranty() {
  return body('isWarranty')
    .notEmpty()
    .bail()
    .withMessage("isWarranty is required")
    .isBoolean()
    .withMessage('isWarranty should be true or false')
}