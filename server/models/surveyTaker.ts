import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("survey_taker")
export class SurveyTaker {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    email!: string
}