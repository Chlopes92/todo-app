
 //CategoryType est un type, il peut être l'une des chaînes de caractères suivantes
export type CategoryType = "🛍️" | "💊️" | "💼" | "💸" | "🧼" | "🤷‍♀️";

// ITodo est une interface qui décrit les caractéristiques d'une tâche
export interface ITodo {
    id: number;   // un nombre pour identifier la tâche
    content: string; // le string qui est le contenu de la tâche
    category?: CategoryType; //qui représente la catégorie à laquelle la tâche appartient
    isUrgent: boolean; //ce booléen va permettre d'indiquer si la tâche est urgente ou non
    doneDate: Date | null; //correspond à la date à laquelle la tâche a été accomplie
    // done: boolean; //ce booléen qui indique si la tâche a été accomplie ou non
}
