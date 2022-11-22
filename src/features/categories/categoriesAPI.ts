import { Category } from "../../types/Category";
import { client } from "../../utils/fetch";

export function fetchCategories( id: number ) {
    return client.get<Category[]>(`/categories?userid=${id}`);
}
