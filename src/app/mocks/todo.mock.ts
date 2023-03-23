
export type CategoryType = "🛍️" | "💊️" | "💼" | "💸" | "🧼" | "🤷‍♀️";

export interface ITodo {
    id: number;
    content: string;
    category?: CategoryType;
    isUrgent: boolean;
    doneDate: Date;
    done: boolean; 
}
