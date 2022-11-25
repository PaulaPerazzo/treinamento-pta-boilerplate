import { Request, Response } from 'express';
import { User } from '@models/User';
import { Citi, Crud } from '../global'

export default class UserController implements Crud {
    async create(req: Request, res: Response) {
        const { firstName, lastName, age } = req.body;

        const isUndefined = Citi.areValuesUndefined(firstName, lastName, age)

        if (isUndefined) {
            return res.status(400).send()
        }

        const newUser = { firstName, lastName, age }
        const {httpStatus, message} = await Citi.insertIntoDatabase(User, newUser)

        return res.status(httpStatus).send({ message })

    }

}

