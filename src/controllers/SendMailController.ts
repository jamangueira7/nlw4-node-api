import { Response, Request} from 'express';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { SurveysRepository } from '../repositories/SurveysRepository';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import SendMailService from '../services/SendMailService';
import { resolve } from 'path';

class SendMailController {
    async execute(request: Request, response: Response) {
        const { email, survey_id } = request.body;

        const usersRepository = getCustomRepository(UsersRepository);
        const surveysRepository = getCustomRepository(SurveysRepository);
        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const userAlreadyExists = await usersRepository.findOne({
            email,
        });

        if(!userAlreadyExists) {
            return response.status(400).json({
               error: "User does not exists"
            });
        }

        const surveyAlreadyExists = await surveysRepository.findOne({
            id: survey_id,
        });

        if(!surveyAlreadyExists) {
            return response.status(400).json({
                error: "Survey does not exists"
            });
        }

        const surveyUsersAlreadyExists = await surveysUsersRepository.findOne({
            where: [{ user_id: userAlreadyExists.id }, { value: null }],
            relations: ['user', 'survey'],
        });

        const variables = {
            name: userAlreadyExists.name,
            title: surveyAlreadyExists.title,
            description: surveyAlreadyExists.description,
            user_id: userAlreadyExists.id,
            link: process.env.URL_MAIL,
        };

        const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs");

        if(surveyUsersAlreadyExists) {
            await SendMailService.execute(
                email,
                surveyAlreadyExists.title,
                variables,
                npsPath
            );

            return response.json(surveyUsersAlreadyExists);
        }

        const surveyUser = surveysUsersRepository.create({
            user_id: userAlreadyExists.id,
            survey_id,
        });

        await surveysUsersRepository.save(surveyUser);

        await SendMailService.execute(
            email,
            surveyAlreadyExists.title,
            variables,
            npsPath
        );

        return response.status(201).json(surveyUser);
    }
}

export { SendMailController };
