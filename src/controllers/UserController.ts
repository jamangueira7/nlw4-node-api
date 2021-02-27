import { Response, Request} from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import * as yup from 'yup';
import { AppErros } from '../errors/AppErros';

class UserController {
    async create(request: Request, response: Response) {
        const { name, email } = request.body;

        const schema = yup.object().shape({
            name: yup.string().required("Nome é obrigatorio."),
            email: yup.string().email().required("Email é obrigatorio.")
        });

        try {
            await schema.validate(request.body, { abortEarly: false });
        } catch (err) {
            throw new AppErros(err);
        }

        const usersRepository = getCustomRepository(UsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email
        });

        if(userAlreadyExists) {
            throw new AppErros("User already exists!");
        }

        const user = usersRepository.create({
            name, email
        });

        await usersRepository.save(user);

        return response.status(201).json(user);
    }

    async show(request: Request, response: Response) {

        const usersRepository = getCustomRepository(UsersRepository);


        const user = await usersRepository.find();

        return response.status(200).json(user);
    }
}

export { UserController };
