export type Answer = {
    text: string;
    correct: boolean;
};

export type Question = {
    text: string;
    answers: Array<Answer>;
};

export type QuestionSet = {
    name: string;
    subject: string;
    multichoice: boolean;
    questions: Array<Question>;
};

export enum QuestionState {
    Unanswered,
    Correct,
    Incorrect,
}
