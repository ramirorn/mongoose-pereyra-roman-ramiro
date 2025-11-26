import { PostModel } from "../models/post.model.js";

// Creacion de un nuevo post
export const createNewPost = async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const post = await PostModel.create({ title, content, author });
    res.status(201).json({
      ok: true,
      msg: "Post creado con exito",
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Traer todos los posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('author');
    res.status(200).json({
      ok: true,
      data: posts,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Traer un post por ID
export const getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostModel.findById(id).populate('author');
    res.status(200).json({
      ok: true,
      data: post,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Actualizar un post
export const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;
  try {
    const updated = await PostModel.findByIdAndUpdate(
      id,
      {
        title,
        content,
        author,
      },
      { new: true }
    );
    res.status(200).json({
      ok: true,
      msg: "Post actualizado correctamente",
      data: updated,
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};

// Borrar un post
export const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await PostModel.findByIdAndUpdate(
      id,
      { exist: false },
      { new: true }
    );
    return res.status(200).json({
      ok: true,
      msg: "Post borrado correctamente",
    });
  } catch (err) {
    return res.status(500).json({
      ok: false,
      msg: "Error interno del servidor",
    });
  }
};
