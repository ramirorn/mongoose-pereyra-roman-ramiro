import { GroupModel } from "../models/group.model.js";

// Creacion de un nuevo group
export const createNewGroup = async (req, res) => {
  const { name, members } = req.body;
  try {
    const group = await GroupModel.create({ name, members });
    res.status(201).json({
      ok: true,
      msg: "Group creado con exito",
      data: group,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Traer todos los groups
export const getAllGroups = async (req, res) => {
  try {
    const groups = await GroupModel.find();
    res.status(200).json({
      ok: true,
      data: groups,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Traer un group por ID
export const getGroupById = async (req, res) => {
  const { id } = req.params;
  try {
    const group = await GroupModel.findById(id);
    res.status(200).json({
      ok: true,
      data: group,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Actualizar un group
export const updateGroup = async (req, res) => {
  const { id } = req.params;
  const { name, members } = req.body;
  try {
    const updated = await GroupModel.findByIdAndUpdate(
      id,
      {
        name,
        members,
      },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      msg: "Group actualizado correctamente",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Borrar un group
export const deleteGroup = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await GroupModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true }
    );
    return res.status(200).json({
      ok: true,
      msg: "Group borrado correctamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
