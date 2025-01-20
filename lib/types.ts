export interface Entry {
    user_id: string
    calories: number
    time: Date
    date: string
}

export interface User {
    user_id: string
    username: string
}

export interface FoodInfo {
    foodName: string
    calories: number
    count: number
}
