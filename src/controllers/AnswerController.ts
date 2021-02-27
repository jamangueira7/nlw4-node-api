import { Response, Request} from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';
import { AppErros } from '../errors/AppErros';

class AnswerController {
    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveyUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveyUsersRepository.findOne({
            id: String(u),
        });

        if(!surveyUser) {
            throw new AppErros("Survay User does not exists!");
        }

        surveyUser.value = Number(value);

        await surveyUsersRepository.save(surveyUser);

        return response.status(200).json(surveyUser);
    }
}

export { AnswerController };
