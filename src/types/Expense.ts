export interface Expense {
    id: number,
    userid: number,
    title: string,
    amount: number,
    category: string,
    note: string | null,
    spentat: string,
    created_at: string;
}
