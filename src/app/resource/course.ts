import { Candidate } from './candidate';

export interface Course {
    id: number,
    description: string,
    subscriptions?: {
        id: number,
        candidate: Candidate
    }[]
}