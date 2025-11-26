# Práctica MongoDB y Mongoose

Este proyecto implementa un sistema de gestión de usuarios, posts, grupos y fotos de perfil utilizando MongoDB y Mongoose con Node.js y Express.

## Estructura del Proyecto

```
mongoose-pereyra-roman-ramiro/
├── src/
│   ├── config/
│   │   └── database.js          # Configuración de conexión a MongoDB
│   ├── controllers/
│   │   ├── user.controllers.js
│   │   ├── post.controllers.js
│   │   ├── group.controllers.js
│   │   └── profile.picture.controllers.js
│   ├── models/
│   │   ├── user.model.js
│   │   ├── post.model.js
│   │   ├── group.model.js
│   │   └── profile.picture.model.js
│   ├── routes/
│   │   ├── index.js
│   │   ├── user.routes.js
│   │   ├── post.routes.js
│   │   ├── group.routes.js
│   │   └── profile.picture.routes.js
│   └── middlewares/
│       ├── validator.js
│       └── validations/
│           ├── user.validations.js
│           ├── post.validations.js
│           ├── group.validations.js
│           └── profile.picture.validations.js
├── app.js
├── package.json
└── .env.example
```

## Relaciones Implementadas

### 1. Propiedad Embebida (Embedded Document)

**Modelo: User - Campo `person`**

```javascript
person: {
  name: String,
  age: Number,
  bio: String,
}
```

**Justificación:**

- La información personal (nombre, edad, biografía) es inherente al usuario y no tiene sentido existir independientemente.
- Esta información se consulta frecuentemente junto con el usuario, por lo que embebida mejora el rendimiento al evitar joins adicionales.
- Los datos embebidos son pequeños y no crecen de manera descontrolada.
- No necesita ser reutilizada en otros contextos o colecciones.

### 2. Relación 1:1 (One-to-One)

**Modelo: User ↔ ProfilePicture**

```javascript
// En User
profile_picture: {
  type: Types.ObjectId,
  ref: "ProfilePicture",
}

// En ProfilePicture
user: {
  type: Types.ObjectId,
  ref: "User",
  required: true,
}
```

**Justificación:**

- Cada usuario tiene solo una foto de perfil principal.
- Se utiliza referenciado en lugar de embebido porque:
  - La foto puede tener metadatos adicionales (URL, fecha de creación, etc.).
  - Permite operaciones CRUD independientes sobre las fotos de perfil.
  - Facilita la eliminación en cascada y el control de existencia.
  - La URL puede ser actualizada sin modificar el documento del usuario.

### 3. Relación 1:N (One-to-Many)

**Modelo: User → Posts**

```javascript
// En Post
author: {
  type: Types.ObjectId,
  ref: "User",
  required: true,
}
```

**Justificación:**

- Un usuario puede crear muchos posts, pero cada post tiene un único autor.
- Se implementa con referencia en el lado del "muchos" (Post) para evitar arrays que crezcan indefinidamente en User.
- Permite consultas eficientes de posts por autor usando índices.
- Facilita el populate para obtener información del autor en las consultas de posts.

### 4. Relación N:M (Many-to-Many)

**Modelo: Group ↔ Users**

```javascript
// En Group
members: [
  {
    type: Types.ObjectId,
    ref: "User",
  },
];
```

**Justificación:**

- Un usuario puede pertenecer a múltiples grupos.
- Un grupo puede tener múltiples miembros.
- Se almacena el array de referencias en Group porque:
  - Los grupos suelen tener un número limitado de miembros.
  - Es más común consultar "¿qué usuarios están en este grupo?" que "¿en qué grupos está este usuario?".
  - Facilita agregar/remover miembros con operadores como `$push` y `$pull`.

## Populate Inverso

### ¿Qué es el Populate Inverso?

El populate inverso permite obtener documentos relacionados desde colecciones que no tienen la referencia directa. Por ejemplo, obtener todos los posts de un usuario cuando la referencia está en Post (autor) y no en User.

### Implementación en el Proyecto

**Ejemplo: Obtener posts de un usuario**

```javascript
// Aunque User no tiene un campo "posts", podemos hacer populate inverso
const userWithPosts = await PostModel.find({ author: userId }).populate(
  "author"
);
```

**Ejemplo con Virtual Populate:**

```javascript
// En el modelo User, se puede agregar un virtual:
UserSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

// Luego en el controlador:
const user = await UserModel.findById(id).populate("posts");
```

### Uso en el Proyecto

En este proyecto, el populate inverso se implementa de las siguientes maneras:

1. **Posts → Author:** `PostModel.find().populate('author')` trae información del autor
2. **Groups → Members:** `GroupModel.find().populate('members')` trae información de los miembros
3. **ProfilePicture → User:** `ProfilePictureModel.find().populate('user')` trae información del usuario

## Eliminación Lógica y en Cascada

### Eliminación Lógica

La eliminación lógica marca registros como inactivos/inexistentes sin borrarlos físicamente de la base de datos.

**Implementación:**

```javascript
// User
isActive: {
  type: Boolean,
  default: true,
}

// Post y ProfilePicture
exist: {
  type: Boolean,
  default: true,
}
```

**Ventajas:**

- Permite recuperar datos eliminados accidentalmente
- Mantiene integridad referencial
- Útil para auditorías y reportes históricos

### Eliminación en Cascada

Cuando se elimina un registro principal, se eliminan (lógicamente) todos los registros relacionados.

**Implementación en User:**

```javascript
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Eliminación lógica del usuario
    await UserModel.findByIdAndUpdate(id, { isActive: false }, { new: true });

    // 2. Eliminación en cascada de posts
    await PostModel.updateMany({ author: id }, { exist: false });

    // 3. Eliminación en cascada de profile picture
    await ProfilePictureModel.updateMany({ user: id }, { exist: false });

    return res.status(200).json({
      ok: true,
      msg: "Usuario borrado correctamente (eliminacion logica y en cascada aplicada)",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
```

**Implementación en ProfilePicture:**

```javascript
export const deleteProfilePicture = async (req, res) => {
  const { id } = req.params;
  try {
    // 1. Eliminación lógica del profile picture
    const deleted = await ProfilePictureModel.findByIdAndUpdate(
      id,
      { exist: false },
      { new: true }
    );

    // 2. Eliminación en cascada: remover referencia en usuario
    if (deleted) {
      await UserModel.updateMany(
        { profile_picture: id },
        { $unset: { profile_picture: "" } }
      );
    }

    return res.status(200).json({
      ok: true,
      msg: "ProfilePicture borrado correctamente (eliminacion logica y en cascada aplicada)",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
```

## Endpoint para Relación N:M

### POST `/api/groups/:id/members`

Permite agregar un nuevo miembro a un grupo (relación muchos a muchos).

**Request:**

```json
{
  "userId": "507f1f77bcf86cd799439011"
}
```

**Implementación:**

```javascript
export const addMemberToGroup = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    // Verificar si el usuario ya está en el grupo
    const group = await GroupModel.findById(id);

    if (!group) {
      return res.status(404).json({
        ok: false,
        msg: "Grupo no encontrado",
      });
    }

    if (group.members.includes(userId)) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario ya es miembro del grupo",
      });
    }

    // Agregar el usuario al grupo usando $push
    const updated = await GroupModel.findByIdAndUpdate(
      id,
      { $push: { members: userId } },
      { new: true }
    ).populate("members");

    res.status(200).json({
      ok: true,
      msg: "Miembro agregado al grupo correctamente",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
```

**Características:**

- Valida que el grupo exista
- Verifica que el usuario no esté ya en el grupo (evita duplicados)
- Usa el operador `$push` de MongoDB para agregar al array
- Retorna el grupo actualizado con populate de los miembros

## Validaciones

El proyecto utiliza **express-validator** para validar todos los endpoints.

**Características:**

- Validación de campos requeridos
- Validación de tipos de datos
- Validación de longitud de strings
- Validación de formato de email y URLs
- Validación de ObjectIds de MongoDB
- Mensajes de error descriptivos en español

**Ejemplo:**

```javascript
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
  // ... más validaciones
];
```

## Códigos HTTP Utilizados

- **201 Created:** Al crear nuevos recursos exitosamente
- **200 OK:** En consultas, actualizaciones y eliminaciones exitosas
- **400 Bad Request:** Cuando las validaciones fallan o hay datos incorrectos
- **404 Not Found:** Cuando no se encuentra un recurso solicitado
- **500 Internal Server Error:** Para errores inesperados del servidor

## Instalación y Configuración

1. Clonar el repositorio
2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Crear archivo `.env` basado en `.env.example`:

   ```env
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/mongoose-practica
   ```

4. Iniciar el servidor:
   ```bash
   npm run dev
   ```

## Endpoints Disponibles

### Users

- `POST /api/users` - Crear usuario
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario (lógico + cascada)

### Posts

- `POST /api/posts` - Crear post
- `GET /api/posts` - Obtener todos los posts
- `GET /api/posts/:id` - Obtener post por ID
- `PUT /api/posts/:id` - Actualizar post
- `DELETE /api/posts/:id` - Eliminar post (lógico)

### Groups

- `POST /api/groups` - Crear grupo
- `GET /api/groups` - Obtener todos los grupos
- `GET /api/groups/:id` - Obtener grupo por ID
- `PUT /api/groups/:id` - Actualizar grupo
- `DELETE /api/groups/:id` - Eliminar grupo (lógico)
- `POST /api/groups/:id/members` - Agregar miembro al grupo (N:M)

### Profile Pictures

- `POST /api/profile-pictures` - Crear foto de perfil
- `GET /api/profile-pictures` - Obtener todas las fotos
- `GET /api/profile-pictures/:id` - Obtener foto por ID
- `PUT /api/profile-pictures/:id` - Actualizar foto
- `DELETE /api/profile-pictures/:id` - Eliminar foto (lógico + cascada)

## Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **express-validator** - Validación de datos
- **dotenv** - Variables de entorno

## Autor

Pereyra Roman Ramiro
