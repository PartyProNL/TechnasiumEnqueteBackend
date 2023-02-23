import { DataSource } from "typeorm";
import { SurveyResponse } from "./models/surveyResponse";
import { SurveyTaker } from "./models/surveyTaker";

export const AppDataSource = new DataSource({
  type: "mariadb",
  host: process.env.MYSQL_HOST,
  port: parseInt(process.env.MYSQL_PORT!),
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [SurveyTaker, SurveyResponse],
  synchronize: true,
  logging: false,
});