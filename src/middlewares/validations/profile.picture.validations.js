import { body } from "express-validator";

// Validaciones para crear un nuevo profile picture
export const createNewProfilePictureValidations = [
    body("url")
        .notEmpty()
        .withMessage("La URL de la foto de perfil no debe estar vacia")
        .isURL()
        .withMessage("La URL debe tener un formato valido"),
    body("user")
        .notEmpty()
        .withMessage("El usuario debe ser incluido")
        .isMongoId()
        .withMessage("El usuario debe ser un ID de MongoDB valido"),
];

// Validaciones para actualizar un profile picture
export const updateProfilePictureValidations = [
    body("url")
        .optional()
        .notEmpty()
        .withMessage("La URL de la foto de perfil no debe estar vacia")
        .isURL()
        .withMessage("La URL debe tener un formato valido"),
    body("user")
        .optional()
        .notEmpty()
        .withMessage("El usuario debe ser incluido")
        .isMongoId()
        .withMessage("El usuario debe ser un ID de MongoDB valido"),
];
