import { shuffleArray } from './utils'

export type Question = {
    Question: string
    Correct_Answer: string
    Incorrect_Answers: string[]
    Additional_Info: string
    Category: string
}

export type QuestionState = Question & {answers: string[]}


export const fetchQuizQuestions = async () => {
    const endpoint= process.env.API_ENDPOINT!
        const data = await(await fetch(endpoint)).json()
        return data.map((question: Question) => (
        {
    ...question, 
    answers: shuffleArray([...question.Incorrect_Answers, question.Correct_Answer])
    }
    )
    )
}
    