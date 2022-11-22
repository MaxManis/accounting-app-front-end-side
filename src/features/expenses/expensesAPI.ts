import { client } from '../../utils/fetch';
import { Expense } from '../../types/Expense';

export function fetchExpenses(id: number) {
    return client.get<Expense[]>(`/expenses?userid=${id}`);
}
