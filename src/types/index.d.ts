export type Answer = {
    text: string;
    correct: boolean;
};

export type Question = {
    text: string;
    answers: Array<Answer>;
};
