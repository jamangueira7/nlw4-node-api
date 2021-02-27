import { Response, Request} from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';
import { resolve } from 'path';

class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveyUsersRepository.findOne({
            id: String(u),
        });

        if(!surveyUser) {
            return response.status(400).json({
                error: "Survay User does not exists!"
            });
        }

        surveyUser.value = Number(value);

        await surveyUsersRepository.save(surveyUser);

        return response.status(200).json(surveyUser);

    }
}

export { AnswerController };
