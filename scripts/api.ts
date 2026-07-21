import { Data } from './types.ts';

export async function getData<K extends keyof Data>(field: K): Promise<Data[K]> {
    const response = await fetch('assets/data.json');
    const data: Data = await response.json();
    return data[field];
}
