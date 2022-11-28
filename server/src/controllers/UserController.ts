import { Request, Response } from "express";
import { User } from "@models/User";
import { Citi, Crud } from "../global";

export default class UserController implements Crud {
  async create(req: Request, res: Response) {
    const { firstName, lastName, age } = req.body;

    const isUndefined = Citi.areValuesUndefined(firstName, lastName, age);

    if (isUndefined) {
      return res.status(400).send();
    }

    const newUser = { firstName, lastName, age };
    const { httpStatus, message } = await Citi.insertIntoDatabase(
      User,
      newUser
    );

    return res.status(httpStatus).send({ message });
  }

  async get(req: Request, res: Response) {
    const { httpStatus, values } = await Citi.getAll(User);
    return res.status(httpStatus).send(values);
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const { message, value: userFound } = await Citi.findByID(User, id);

    if (!userFound) return res.status(400).send({ message });

    const { httpStatus, messageFromDelete } = await Citi.deleteValue(
      User,
      userFound
    );

    return res.status(httpStatus).send({ messageFromDelete });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { message, value: userFound } = await Citi.findByID(User, id);

    if (!userFound) return res.status(400).send({ message });

    const { firstName, lastName, age } = req.body;

    const isUndefined = Citi.areValuesUndefined(firstName, lastName, age);

    if (isUndefined) {
      return res.status(400).send();
    }

    const userWithUpdatedValues = { firstName, lastName, age };

    const { httpStatus, messageFromUpdate } = await Citi.updateValue(
      User,
      id,
      userWithUpdatedValues
    );

    return res.status(httpStatus).send({ messageFromUpdate });
  }
}
