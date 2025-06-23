const { body, param, query } = require('express-validator');
const { validatorMessage } = require('../utils/errorMessage');

const create = function () {
    return [
        body('nome', validatorMessage('Nome')).exists().bail().isString(),
        body('email', validatorMessage('Email')).exists().bail().isEmail().withMessage('Email inválido'),
        body('senha', validatorMessage('Senha')).exists().bail().isString().isLength({ min: 6 }).withMessage('Senha deve ter ao menos 6 caracteres'),
    ];
};

const encontrarPorId = function () {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt(),
    ];
};

const excluirPorId = function () {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt(),
    ];
};

const pesquisarPorNome = function () {
    return [
        query('name', validatorMessage('Nome')).exists().bail().isString().notEmpty(),
    ];
};

const trocarSenha = function () {
    return [
        param('id', validatorMessage('Id')).exists().bail().isInt(),
        body('newPassword', validatorMessage('Nova senha')).exists().bail().isString().isLength({ min: 6 }).withMessage('Nova senha deve ter ao menos 6 caracteres'),
    ];
};

module.exports = {
    create,
    encontrarPorId,
    excluirPorId,
    pesquisarPorNome,
    trocarSenha,
};
