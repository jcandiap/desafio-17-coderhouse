import bcrypt from 'bcrypt';
import log4js from 'log4js';

import UserDAO from '../dao/UserDAO.js';
import UserDTO from '../dto/UserDTO.js';

const userContainer = new UserDAO();
const logger = log4js.getLogger();
const errorLogger = log4js.getLogger('error');

export const register = async (req, res) => {
    logger.info('inicia metodo [register]');
    try {
        const data = req.body;
        const user = await userContainer.login(data);
        if( Boolean(user) ) {
            res.status(400).send({ status: 'error', message: 'Ya existe un usuario con ese email' });
            return;
        }
        data.password = await bcrypt.hash(data.password, 10);
        await userContainer.save(data);
        const userDTO = new UserDTO(data);
        req.session.user = userDTO;
        res.send({ status: 'ok', message: 'Usuario creado con exito' });
    } catch (error) {
        errorLogger.error('Error: ', error.message);
        res.status(500).send({ status: 'error', message: 'Error al guardar el usuario' });
    }
}

export const login = async (req, res) => {
    logger.info('inicia metodo [login]');
    try {
        const user = await userContainer.login(req.body);
        if( Boolean(user) ) {
            const validatePassword = await bcrypt.compare(req.body.password, user.password);
            if( validatePassword ) {
                const userDTO = new UserDTO(user);
                req.session.user = userDTO;
                res.send({ status: 'ok', response: userDTO, message: `¡${ userDTO.nombre } ${ userDTO.apellido } se ha conectado!` });
            } else {
                res.status(401).send({ status: 'error', message: 'Contraseña incorrecta' });
            }
        } else {
            res.status(401).send({ status: 'error', message: 'Usuario no encontrado' });
        }
    } catch (error) {
        errorLogger.error('Error: ', error.message);
        res.status(500).send({ status: 'error', message: 'Datos no coinciden' });
    }
}

export const logout = (req, res) => {
    logger.info('inicia metodo [logout]');
    req.session.destroy(err => {
        if(!err) {
            res.send({ status: 'ok', message: 'Sesion cerrada con exito' });
            return;
        }
        errorLogger.error('Error al cerrar la sesion');
        res.status(500).send({ status: 'error', message: 'Error al cerrar la sesion' });
    })
}
