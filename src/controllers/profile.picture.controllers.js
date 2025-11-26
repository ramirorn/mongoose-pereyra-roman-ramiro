import { ProfilePictureModel } from "../models/profile.picture.model.js";
import { UserModel } from "../models/user.model.js";

// Creacion de un nuevo profile_picture
export const createNewProfilePicture = async (req, res) => {
  const { url, user } = req.body;
  try {
    const profilePicture = await ProfilePictureModel.create({ url, user });
    res.status(201).json({
      ok: true,
      msg: "ProfilePicture creado con exito",
      data: profilePicture,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Traer todos los profile_pictures
export const getAllProfilePictures = async (req, res) => {
  try {
    const profilePictures = await ProfilePictureModel.find().populate('user');
    res.status(200).json({
      ok: true,
      data: profilePictures,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Traer un profile_picture por ID
export const getProfilePictureById = async (req, res) => {
  const { id } = req.params;
  try {
    const profilePicture = await ProfilePictureModel.findById(id).populate('user');
    res.status(200).json({
      ok: true,
      data: profilePicture,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Actualizar un profile_picture
export const updateProfilePicture = async (req, res) => {
  const { id } = req.params;
  const { url, user } = req.body;
  try {
    const updated = await ProfilePictureModel.findByIdAndUpdate(
      id,
      {
        url,
        user,
      },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      msg: "ProfilePicture actualizado correctamente",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Borrar un profile_picture
export const deleteProfilePicture = async (req, res) => {
  const { id } = req.params;
  try {
    // Eliminacion logica del profile picture
    const deleted = await ProfilePictureModel.findByIdAndUpdate(
      id,
      { exist: false },
      { new: true }
    );

    // Eliminacion en cascada: remover referencia en el usuario
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
