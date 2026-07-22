import type { Data, RawProduct, RawMarket, RawCategory, RawSetting, RawOption } from './types.ts';

export async function getData<K extends keyof Data>(field: K): Promise<Data[K]> {
    const response = await fetch('src/data.json');
    const data: Data = await response.json();
    return data[field];
}

const API_URL = 'http://localhost:5000/api/';

export async function getProducts(): Promise<RawProduct[]> {
    const response = await fetch(`${API_URL}menu`);
    if (!response.ok) throw new Error('Не удалось загрузить меню');
    return response.json();
}
export async function getMarkets(): Promise<Record<string, RawMarket>> {
    const response = await fetch(`${API_URL}markets`);
    if (!response.ok) throw new Error('Не удалось загрузить магазины');
    return response.json();
}
export async function getCategories(): Promise<Record<string, RawCategory>> {
    const response = await fetch(`${API_URL}categories`);
    if (!response.ok) throw new Error('Не удалось загрузить категории');
    return response.json();
}
export async function getSettings(): Promise<Record<string, RawSetting>> {
    const response = await fetch(`${API_URL}settings`);
    if (!response.ok) throw new Error('Не удалось загрузить категории опций');
    return response.json();
}

export async function getOptions(settingKey: string): Promise<Record<string, RawOption>> {
    const response = await fetch(`${API_URL}options?settingKey=${settingKey}`);
    if (!response.ok) throw new Error('Не удалось загрузить опции');
    return response.json();
}
