export interface RawProduct {
    _id?: string;
    name: string;
    description: string;
    image: string;
    price: number;
    category: string;
    market: string;
    type: string;
    weight: number;
    components: RawComponents;
}
export interface RawComponents {
    [key: string]: string | string[];
}
export interface RawOption {
    name: string;
    description: string;
    price: number;
    image: string;
}
export interface RawMarket {
    _id?: string;
    name: string;
    image: string;
}
export interface RawCategory {
    name: string;
    description: string;
}
export interface RawSetting {
    _id?: string;
    name: string;
    object: string;
    title: string;
    multiple: boolean;
}

export interface Data {
    version: string;
    menu: RawProduct[];
    fillings: Record<string, RawOption>;
    sizes: Record<string, RawOption>;
    breads: Record<string, RawOption>;
    vegetables: Record<string, RawOption>;
    sauces: Record<string, RawOption>;
    markets: Record<string, RawMarket>;
    categories: Record<string, RawCategory>;
    settings: Record<string, RawSetting>;
}
