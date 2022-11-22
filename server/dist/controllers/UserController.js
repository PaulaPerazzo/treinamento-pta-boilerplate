"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = require("../models/User");

var _global = require("../global");

class UserController {
  async create(request, response) {
    const {
      firstName,
      lastName,
      age
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(firstName, lastName, age);

    if (isAnyUndefined) return response.status(400).send();
    const newUser = {
      firstName,
      lastName,
      age
    };
    const {
      httpStatus,
      message
    } = await _global.Citi.insertIntoDatabase(_User.User, newUser);
    return response.status(httpStatus).send({
      message
    });
  }

  async get(request, response) {
    const {
      httpStatus,
      values
    } = await _global.Citi.getAll(_User.User);
    return response.status(httpStatus).send(values);
  }

  async delete(request, response) {
    const {
      id
    } = request.params;
    const {
      value: userFound,
      message
    } = await _global.Citi.findByID(_User.User, id);
    if (!userFound) return response.status(400).send({
      message
    });
    const {
      httpStatus,
      messageFromDelete
    } = await _global.Citi.deleteValue(_User.User, userFound);
    return response.status(httpStatus).send({
      messageFromDelete
    });
  }

  async update(request, response) {
    const {
      id
    } = request.params;
    const {
      firstName,
      lastName,
      age
    } = request.body;

    const isAnyUndefined = _global.Citi.areValuesUndefined(firstName, lastName, age, id);

    if (isAnyUndefined) return response.status(400).send();
    const userWithUpdatedValues = {
      firstName,
      lastName,
      age
    };
    const {
      httpStatus,
      messageFromUpdate
    } = await _global.Citi.updateValue(_User.User, id, userWithUpdatedValues);
    return response.status(httpStatus).send({
      messageFromUpdate
    });
  }

}

exports.default = UserController;