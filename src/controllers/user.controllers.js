import { UserModel } from "../models/user.model.js";

// Creacion de un nuevo usuario
export const createNewUser = async (req, res) => {
  const { username, email, password, person } = req.body;
  try {
    const user = await UserModel.create({ username, email, password, person });
    res.status(201).json({
      ok: true,
      msg: "Usuario creado con exito",
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Traer todos los usuarios
export const getAllUser = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      ok: true,
      data: users,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Traer un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await UserModel.findById(id);
    res.status(200).json({
      ok: true,
      data: user,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Actualizar un usuario
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email, password, person } = req.body;
  try {
    const updated = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password,
        person,
      },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      msg: "Usuario actualizado correctamente",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Borrar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await UserModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    return res.status(200).json({
      ok: true,
      msg: "Usuario borrado correctamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
