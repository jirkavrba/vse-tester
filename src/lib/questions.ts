import type { QuestionSet } from "../types";

export const fetchQuestionSets = async (): Promise<Array<QuestionSet>> => {
    const sets = ["1fp201", "3sg201", "4it115", "4sa310", "4st204", "11f201", "4iz210", "zbrojni-prukaz"];
    const promises = sets.map(async (set: string) => {
        const source = await import(`../questions/${set}.json`);

        return {
            name: source.name,
            subject: source.code,
            multichoice: source.multichoice,
            questions: source.questions,
        };
    });

    return await Promise.all(promises);
};
