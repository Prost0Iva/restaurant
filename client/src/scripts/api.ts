import type { Data } from './types.ts';

export async function getData<K extends keyof Data>(field: K): Promise<Data[K]> {
    const response = await fetch('src/data.json');
    const data: Data = await response.json();
    return data[field];
}

const API_URL = 'http://localhost:5000/api/';

interface Product {
    _id?: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    market: string;
    type: string;
    weight: number;
    components: {
        size: string;
        bread: string;
        vegetable: string[];
        sauce: string[];
        filling: string[];
    };
}

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(`${API_URL}menu`);
    if (!response.ok) throw new Error('Не удалось загрузить меню');
    return response.json();
}
