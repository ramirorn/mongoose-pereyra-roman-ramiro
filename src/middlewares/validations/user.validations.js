import { body } from "express-validator";

// Validaciones para crear un nuevo usuario
export const createNewUserValidations = [
  body("username")
    .notEmpty()
    .withMessage("El nombre de usuario no debe estar vacio")
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "El nombre de usuario debe tener como minimo 5 caracteres y no debe superar los 20"
    ),
  body("email")
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email debe tener un formato valido")
    .normalizeEmail(),
  body("password")
    .notEmpty()
    .withMessage("La contraseña no debe estar vacia")
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "La contraseña debe tener como minimo 5 caracteres y 20 como maximo"
    ),
  body("profile_picture")
    .optional()
    .notEmpty()
    .withMessage("La foto de perfil debe ser incluida")
    .isMongoId()
    .withMessage("El ID de la foto de perfil debe ser un ID de MongoDB valido"),
  body("isActive")
    .optional()
    .notEmpty("isActive no debe estar vacio")
    .isBoolean()
    .withMessage("isActive debe tener un valor booleano"),
  body("person")
    .notEmpty()
    .withMessage("Los campos de person no deben estar vacios"),
  body("person.name")
    .notEmpty()
    .withMessage("El nombre de la persona debe ser incluido")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "El nombre debe tener 3 caracteres como minimo y 30 como maximo"
    ),
  body("person.age")
    .notEmpty()
    .withMessage("La edad de la persona debe ser incluida")
    .isInt()
    .withMessage("La edad debe ser un numero entero"),
  body("person.bio")
    .optional()
    .notEmpty()
    .withMessage("La bio de la persona no debe estar vacia")
    .isLength({ min: 15, max: 150 })
    .withMessage(
      "La bio de la persona debe contener 15 caracteres como minimo y 150 como maximo"
    ),
];

// Validaciones para actualizar un usuario
export const updateUserValidations = [
  body("username")
    .optional()
    .notEmpty()
    .withMessage("El nombre de usuario no debe estar vacio")
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "El nombre de usuario debe tener como minimo 5 caracteres y no debe superar los 20"
    ),
  body("email")
    .optional()
    .notEmpty()
    .withMessage("El email no debe estar vacio")
    .isEmail()
    .withMessage("El email debe tener un formato valido")
    .normalizeEmail(),
  body("password")
    .optional()
    .notEmpty()
    .withMessage("La contraseña no debe estar vacia")
    .isLength({ min: 5, max: 20 })
    .withMessage(
      "La contraseña debe tener como minimo 5 caracteres y 20 como maximo"
    ),
  body("profile_picture")
    .optional()
    .notEmpty()
    .withMessage("La foto de perfil debe ser incluida")
    .isMongoId()
    .withMessage("El ID de la foto de perfil debe ser un ID de MongoDB valido"),
  body("isActive")
    .optional()
    .notEmpty("isActive no debe estar vacio")
    .isBoolean()
    .withMessage("isActive debe tener un valor booleano"),
  body("person")
    .optional()
    .notEmpty()
    .withMessage("Los campos de person no deben estar vacios"),
  body("person.name")
    .optional()
    .notEmpty()
    .withMessage("El nombre de la persona debe ser incluido")
    .isLength({ min: 3, max: 30 })
    .withMessage(
      "El nombre debe tener 3 caracteres como minimo y 30 como maximo"
    ),
  body("person.age")
    .optional()
    .notEmpty()
    .withMessage("La edad de la persona debe ser incluida")
    .isInt()
    .withMessage("La edad debe ser un numero entero"),
  body("person.bio")
    .optional()
    .notEmpty()
    .withMessage("La bio de la persona no debe estar vacia")
    .isLength({ min: 15, max: 150 })
    .withMessage(
      "La bio de la persona debe contener 15 caracteres como minimo y 150 como maximo"
    ),
];
