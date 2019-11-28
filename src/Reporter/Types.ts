import { Test } from "../BDD";

export interface Reporter {
  (testResults: string): void;
}