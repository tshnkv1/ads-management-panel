import { TAdvertisement } from "../types/types";

export const getAdvertisements = (): TAdvertisement[] => JSON.parse(localStorage.getItem('ads') || '[]');
export const saveAdvertisements = (ads: TAdvertisement[]) => localStorage.setItem('ads', JSON.stringify(ads));
