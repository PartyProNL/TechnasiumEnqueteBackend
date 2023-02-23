import { NextFunction, Request, Response, Router } from "express";
import { AppDataSource } from "./../dataSource";
import { SurveyResponse } from "./../models/surveyResponse";
import { SurveyTaker } from "./../models/surveyTaker";
import * as argon2 from "argon2"

export class ResponseController {
    
    public router = Router()
    private takerRepository
    private responseRepository
    
    constructor() {
        this.takerRepository = AppDataSource.getRepository(SurveyTaker)
        this.responseRepository = AppDataSource.getRepository(SurveyResponse)

        this.router.post("/", this.addSurvey)
    }

    addSurvey = async (request: Request, response: Response, nextFunction: NextFunction) => {
        console.log(request.body)
        /*

            {
                "email": "",
                "surveyData": {
                    "Wat is jouw naam?!?!?!": "Youri"
                }
            }

        */

        const { email, surveyData} = request.body
        if(!email || !surveyData) {
            return response.status(400).json({ error: "Email and surveyData are required!" })
        }

        const hashedEmail = await this.hashEmail(email)

        // check if email exists
        const emailExists = await this.takerRepository.exist({
            where: {
                email: hashedEmail
            }
        })

        if(!emailExists) {
            const newEmail = new SurveyTaker()
            newEmail.email = hashedEmail

            await this.takerRepository.save(newEmail)

            // create new survey response
            const newResponse = new SurveyResponse()
            newResponse.response = surveyData

            await this.responseRepository.save(newResponse)

            return response.status(200).json({ message: "Survey response added!" })
        } else {
            return response.status(400).json({ error: "Email already exists!" })
        }
    }

    hashEmail = async (email: string) => {
        // hash email using Argon2id algorithm
        const hash = await argon2.hash(email, { salt: Buffer.from(process.env.HASH_SALT!), type: argon2.argon2id})

        return hash
    }
}