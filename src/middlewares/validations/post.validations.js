import { body } from "express-validator";

// Validaciones para crear un nuevo post
export const createNewPostValidations = [
    body("title")
        .notEmpty()
        .withMessage("El titulo del post no debe estar vacio")
        .isLength({ min: 5, max: 100 })
        .withMessage(
            "El titulo debe tener como minimo 5 caracteres y no debe superar los 100"
        ),
    body("content")
        .notEmpty()
        .withMessage("El contenido del post no debe estar vacio")
        .isLength({ min: 10, max: 1000 })
        .withMessage(
            "El contenido debe tener como minimo 10 caracteres y no debe superar los 1000"
        ),
    body("author")
        .notEmpty()
        .withMessage("El autor del post debe ser incluido")
        .isMongoId()
        .withMessage("El autor debe ser un ID de MongoDB valido"),
];

// Validaciones para actualizar un post
export const updatePostValidations = [
    body("title")
        .optional()
        .notEmpty()
        .withMessage("El titulo del post no debe estar vacio")
        .isLength({ min: 5, max: 100 })
        .withMessage(
            "El titulo debe tener como minimo 5 caracteres y no debe superar los 100"
        ),
    body("content")
        .optional()
        .notEmpty()
        .withMessage("El contenido del post no debe estar vacio")
        .isLength({ min: 10, max: 1000 })
        .withMessage(
            "El contenido debe tener como minimo 10 caracteres y no debe superar los 1000"
        ),
    body("author")
        .optional()
        .notEmpty()
        .withMessage("El autor del post debe ser incluido")
        .isMongoId()
        .withMessage("El autor debe ser un ID de MongoDB valido"),
];
