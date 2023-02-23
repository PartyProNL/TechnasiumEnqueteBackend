import {Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity("survey_response")
export class SurveyResponse {
    
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: "simple-json"})
    response!: string

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    date!: Date
}