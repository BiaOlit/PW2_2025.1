const db = require('../database/models/index');
const { Usuario } = require('../database/models/index');

const create = async function(usuario) {
    const usuarioCriado = await Usuario.create(usuario);
    return usuarioCriado;
}

const atualizar = async function(usuario, id) {
    await Usuario.update(usuario, {  // Corrigi aqui: era usuario.update, agora é Usuario.update
        where: { id: id }
    });
}

const encontrarTodos = async function() {
    const usuarios = await Usuario.findAll();
    return usuarios;
}

const encontrarPorId = async function(id) {
    const usuario = await Usuario.findByPk(id);
    return usuario;
}

const encontrarPorWhere = async function(where) {
    const usuario = await Usuario.findOne({
        where: where
    });
    return usuario;
}

// === NOVAS FUNÇÕES ===

// Excluir usuário por ID
const excluirPorId = async function(id) {
    return await Usuario.destroy({
        where: { id: id }
    });
}

// Pesquisar usuário por nome (LIKE)
const pesquisarPorNome = async function(name) {
    const { Op } = require('sequelize');
    const usuarios = await Usuario.findAll({
        where: {
            nome: {
                [Op.like]: `%${name}%`
            }
        }
    });
    return usuarios;
}

// Atualizar senha do usuário
const atualizarSenha = async function(id, novaSenhaCriptografada) {
    return await Usuario.update(
        { senha: novaSenhaCriptografada },
        { where: { id: id } }
    );
}

module.exports = {
    create: create,
    atualizar: atualizar,
    encontrarTodos: encontrarTodos,
    encontrarPorId: encontrarPorId,
    encontrarPorWhere: encontrarPorWhere,
    excluirPorId: excluirPorId,
    pesquisarPorNome: pesquisarPorNome,
    atualizarSenha: atualizarSenha
}
