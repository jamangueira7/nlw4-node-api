import { Response, Request} from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveysUsersRepository } from '../repositories/SurveysUsersRepository';

class NpsController {
    async execute(request: Request, response: Response) {

    }
}

export { NpsController };
