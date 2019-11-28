import { Reporter } from "./Types";

export const reporter: Reporter = (report: string) => {
  console.log(report);
}