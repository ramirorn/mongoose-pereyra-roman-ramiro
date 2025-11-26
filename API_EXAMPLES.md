# Ejemplos de Peticiones API

Este archivo contiene ejemplos de peticiones HTTP para probar todos los endpoints de la API.

## Users

### Crear Usuario

```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "username": "ramiro123",
  "email": "ramiro@example.com",
  "password": "password123",
  "person": {
    "name": "Ramiro Pereyra",
    "age": 25,
    "bio": "Desarrollador full stack con experiencia en Node.js y MongoDB"
  }
}
```

### Crear Usuario con Profile Picture

```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "username": "maria456",
  "email": "maria@example.com",
  "password": "secure789",
  "profile_picture": "507f1f77bcf86cd799439011",
  "person": {
    "name": "Maria Garcia",
    "age": 28,
    "bio": "Diseñadora gráfica apasionada por el arte digital y la ilustración"
  }
}
```

### Obtener Todos los Usuarios

```http
GET http://localhost:3000/api/users
```

### Obtener Usuario por ID

```http
GET http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

### Actualizar Usuario

```http
PUT http://localhost:3000/api/users/507f1f77bcf86cd799439011
Content-Type: application/json

{
  "username": "ramiro_updated",
  "person": {
    "name": "Ramiro Pereyra Roman",
    "age": 26,
    "bio": "Senior full stack developer especializado en MERN stack"
  }
}
```

### Eliminar Usuario (Lógico + Cascada)

```http
DELETE http://localhost:3000/api/users/507f1f77bcf86cd799439011
```

---

## Posts

### Crear Post

```http
POST http://localhost:3000/api/posts
Content-Type: application/json

{
  "title": "Mi primer post en MongoDB",
  "content": "Este es el contenido de mi primer post usando Mongoose. Es muy interesante aprender sobre bases de datos NoSQL.",
  "author": "507f1f77bcf86cd799439011"
}
```

### Obtener Todos los Posts

```http
GET http://localhost:3000/api/posts
```

### Obtener Post por ID

```http
GET http://localhost:3000/api/posts/507f191e810c19729de860ea
```

### Actualizar Post

```http
PUT http://localhost:3000/api/posts/507f191e810c19729de860ea
Content-Type: application/json

{
  "title": "Mi primer post actualizado",
  "content": "He actualizado el contenido de mi post para incluir más información sobre MongoDB y Mongoose."
}
```

### Eliminar Post (Lógico)

```http
DELETE http://localhost:3000/api/posts/507f191e810c19729de860ea
```

---

## Groups

### Crear Grupo

```http
POST http://localhost:3000/api/groups
Content-Type: application/json

{
  "name": "Desarrolladores Node.js",
  "members": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012"
  ]
}
```

### Crear Grupo sin Miembros

```http
POST http://localhost:3000/api/groups
Content-Type: application/json

{
  "name": "Diseñadores UI/UX"
}
```

### Obtener Todos los Grupos

```http
GET http://localhost:3000/api/groups
```

### Obtener Grupo por ID

```http
GET http://localhost:3000/api/groups/507f191e810c19729de860eb
```

### Actualizar Grupo

```http
PUT http://localhost:3000/api/groups/507f191e810c19729de860eb
Content-Type: application/json

{
  "name": "Desarrolladores MERN Stack",
  "members": [
    "507f1f77bcf86cd799439011",
    "507f1f77bcf86cd799439012",
    "507f1f77bcf86cd799439013"
  ]
}
```

### Agregar Miembro a Grupo (Relación N:M)

```http
POST http://localhost:3000/api/groups/507f191e810c19729de860eb/members
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439014"
}
```

### Eliminar Grupo (Lógico)

```http
DELETE http://localhost:3000/api/groups/507f191e810c19729de860eb
```

---

## Profile Pictures

### Crear Profile Picture

```http
POST http://localhost:3000/api/profile-pictures
Content-Type: application/json

{
  "url": "https://example.com/images/profile1.jpg",
  "user": "507f1f77bcf86cd799439011"
}
```

### Obtener Todas las Profile Pictures

```http
GET http://localhost:3000/api/profile-pictures
```

### Obtener Profile Picture por ID

```http
GET http://localhost:3000/api/profile-pictures/507f191e810c19729de860ec
```

### Actualizar Profile Picture

```http
PUT http://localhost:3000/api/profile-pictures/507f191e810c19729de860ec
Content-Type: application/json

{
  "url": "https://example.com/images/profile1_updated.jpg"
}
```

### Eliminar Profile Picture (Lógico + Cascada)

```http
DELETE http://localhost:3000/api/profile-pictures/507f191e810c19729de860ec
```

---

## Ejemplo de Flujo Completo

### 1. Crear Profile Picture

```http
POST http://localhost:3000/api/profile-pictures
Content-Type: application/json

{
  "url": "https://example.com/images/ramiro.jpg",
  "user": "507f1f77bcf86cd799439011"
}
```

**Respuesta:** Guarda el `_id` de la foto creada

### 2. Crear Usuario con esa Profile Picture

```http
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "username": "ramiro123",
  "email": "ramiro@example.com",
  "password": "password123",
  "profile_picture": "[ID de la foto del paso 1]",
  "person": {
    "name": "Ramiro Pereyra",
    "age": 25,
    "bio": "Desarrollador full stack con experiencia en Node.js y MongoDB"
  }
}
```

**Respuesta:** Guarda el `_id` del usuario creado

### 3. Crear Post con ese Usuario como Autor

```http
POST http://localhost:3000/api/posts
Content-Type: application/json

{
  "title": "Mi primer post",
  "content": "Este es mi primer post en la plataforma. Estoy emocionado de compartir contenido.",
  "author": "[ID del usuario del paso 2]"
}
```

### 4. Crear Grupo e Incluir al Usuario

```http
POST http://localhost:3000/api/groups
Content-Type: application/json

{
  "name": "Desarrolladores Backend",
  "members": ["[ID del usuario del paso 2]"]
}
```

**Respuesta:** Guarda el `_id` del grupo creado

### 5. Agregar otro Usuario al Grupo

```http
POST http://localhost:3000/api/groups/[ID del grupo]/members
Content-Type: application/json

{
  "userId": "507f1f77bcf86cd799439015"
}
```

### 6. Obtener Usuario con Populate (verás la profile picture completa)

```http
GET http://localhost:3000/api/users/[ID del usuario del paso 2]
```

### 7. Obtener Grupo con Populate (verás todos los miembros completos)

```http
GET http://localhost:3000/api/groups/[ID del grupo del paso 4]
```

### 8. Eliminar Usuario (se eliminarán en cascada sus posts y profile picture)

```http
DELETE http://localhost:3000/api/users/[ID del usuario del paso 2]
```

---

## Notas Importantes

1. **IDs de MongoDB:** Los IDs mostrados en los ejemplos (`507f1f77bcf86cd799439011`) son ejemplos. Debes usar los IDs reales que obtengas al crear los documentos.

2. **Populate Automático:** Todos los endpoints GET ya incluyen populate, por lo que verás los datos relacionados completos.

3. **Validaciones:** Todos los endpoints tienen validaciones. Si envías datos inválidos, recibirás un error 400 con los detalles.

4. **Eliminación en Cascada:**

   - Al eliminar un usuario, se eliminan sus posts y profile pictures
   - Al eliminar una profile picture, se elimina la referencia en el usuario

5. **Códigos de Estado:**
   - `201` - Recurso creado exitosamente
   - `200` - Operación exitosa
   - `400` - Datos inválidos
   - `404` - Recurso no encontrado
   - `500` - Error del servidor

---

## Testing con Herramientas

Puedes usar estas herramientas para probar la API:

- **Thunder Client** (Extensión de VS Code)
- **Postman**
- **Insomnia**
- **cURL** (línea de comandos)

### Ejemplo con cURL:

```bash
# Crear usuario
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "username": "ramiro123",
    "email": "ramiro@example.com",
    "password": "password123",
    "person": {
      "name": "Ramiro Pereyra",
      "age": 25,
      "bio": "Desarrollador full stack con experiencia en Node.js y MongoDB"
    }
  }'

# Obtener todos los usuarios
curl http://localhost:3000/api/users
```
