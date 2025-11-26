import { body } from "express-validator";

// Validaciones para crear un nuevo group
export const createNewGroupValidations = [
    body("name")
        .notEmpty()
        .withMessage("El nombre del grupo no debe estar vacio")
        .isLength({ min: 3, max: 50 })
        .withMessage(
            "El nombre debe tener como minimo 3 caracteres y no debe superar los 50"
        ),
    body("members")
        .optional()
        .isArray()
        .withMessage("Los miembros deben ser un array")
        .custom((value) => {
            if (value && value.length > 0) {
                return value.every((member) => typeof member === "string");
            }
            return true;
        })
        .withMessage("Cada miembro debe ser un ID de MongoDB valido"),
];

// Validaciones para actualizar un group
export const updateGroupValidations = [
    body("name")
        .optional()
        .notEmpty()
        .withMessage("El nombre del grupo no debe estar vacio")
        .isLength({ min: 3, max: 50 })
        .withMessage(
            "El nombre debe tener como minimo 3 caracteres y no debe superar los 50"
        ),
    body("members")
        .optional()
        .isArray()
        .withMessage("Los miembros deben ser un array")
        .custom((value) => {
            if (value && value.length > 0) {
                return value.every((member) => typeof member === "string");
            }
            return true;
        })
        .withMessage("Cada miembro debe ser un ID de MongoDB valido"),
];

// Validaciones para agregar un miembro a un grupo
export const addMemberToGroupValidations = [
    body("userId")
        .notEmpty()
        .withMessage("El ID del usuario no debe estar vacio")
        .isMongoId()
        .withMessage("El ID del usuario debe ser un ID de MongoDB valido"),
];
