const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');
const usuarioValidator = require('../validators/usuario.validator');

router.post('/', usuarioValidator.create(), usuarioController.create);
router.get('/search/name', usuarioValidator.pesquisarPorNome(), usuarioController.pesquisarPorNome);
router.put('/:id/password', usuarioValidator.trocarSenha(), usuarioController.trocarSenha);
router.delete('/:id', usuarioValidator.excluirPorId(), usuarioController.excluirPorId);
router.get('/:id', usuarioValidator.encontrarPorId(), usuarioController.encontrarPorId);
router.get('/', usuarioController.encontrarTodos);

module.exports = router;
