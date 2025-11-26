import { UserModel } from "../models/user.model.js";
import { PostModel } from "../models/post.model.js";
import { ProfilePictureModel } from "../models/profile.picture.model.js";

// Creacion de un nuevo usuario
export const createNewUser = async (req, res) => {
  const { username, email, password, person, profile_picture } = req.body;
  try {
    const user = await UserModel.create({ username, email, password, person, profile_picture });
    const populatedUser = await UserModel.findById(user._id).populate('profile_picture');
    res.status(201).json({
      ok: true,
      msg: "Usuario creado con exito",
      data: populatedUser,
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
    const users = await UserModel.find().populate('profile_picture');
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
    const user = await UserModel.findById(id).populate('profile_picture');
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
  const { username, email, password, person, profile_picture } = req.body;
  try {
    const updated = await UserModel.findByIdAndUpdate(
      id,
      {
        username,
        email,
        password,
        person,
        profile_picture,
      },
      { new: true }
    ).populate('profile_picture');
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
    // Eliminacion logica del usuario
    const deleted = await UserModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );

    // Eliminacion en cascada: desactivar posts del usuario
    await PostModel.updateMany(
      { author: id },
      { exist: false }
    );

    // Eliminacion en cascada: desactivar profile picture del usuario
    await ProfilePictureModel.updateMany(
      { user: id },
      { exist: false }
    );

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
