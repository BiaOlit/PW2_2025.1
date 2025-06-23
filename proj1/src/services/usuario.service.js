const usuarioRepository = require('../repositories/usuario.repository');
const createError = require('http-errors');
require('dotenv').config();
const bcrypt = require('bcrypt');

const create = async function(usuario) {
    const existeUsuario = await usuarioRepository.encontrarPorWhere({ email: usuario.email });

    if (existeUsuario) {
        return createError(409, 'Usuário já existe');
    }

    usuario.senha = await bcrypt.hash(usuario.senha, parseInt(process.env.SALT));
    const usuarioCriado = await usuarioRepository.create(usuario);
    return usuarioCriado;
}

const encontrarTodos = async function() {
    const usuarios = await usuarioRepository.encontrarTodos();
    return usuarios;
}

const encontrarPorId = async function(id) {
    const usuario = await usuarioRepository.encontrarPorId(id);

    if (!usuario){
        return createError(404, 'Usuário não encontrado');
    }

    return usuario;
}

// 🚩 Novo: Excluir usuário por ID
const excluirPorId = async function(id) {
    const usuario = await usuarioRepository.encontrarPorId(id);
    if (!usuario) {
        return createError(404, 'Usuário não encontrado');
    }

    await usuarioRepository.excluirPorId(id);
    return { message: 'Usuário excluído com sucesso' };
}

// 🚩 Novo: Pesquisar por nome (exemplo: LIKE no nome)
const pesquisarPorNome = async function(name) {
    const usuarios = await usuarioRepository.pesquisarPorNome(name);
    return usuarios;
}

// 🚩 Novo: Trocar senha do usuário
const trocarSenha = async function(id, novaSenha) {
    const usuario = await usuarioRepository.encontrarPorId(id);
    if (!usuario) {
        return createError(404, 'Usuário não encontrado');
    }

    const senhaCriptografada = await bcrypt.hash(novaSenha, parseInt(process.env.SALT));
    await usuarioRepository.atualizarSenha(id, senhaCriptografada);

    return { message: 'Senha atualizada com sucesso' };
}

module.exports = {
    create,
    encontrarTodos,
    encontrarPorId,
    excluirPorId,
    pesquisarPorNome,
    trocarSenha
};
