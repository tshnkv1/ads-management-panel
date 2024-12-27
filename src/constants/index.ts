import { TAdvertisement } from "../types/types";

export const API_URL = 'https://api.api-ninjas.com/v1/quotes';

export const API_KEYS = {
    QUOTES_API_KEY: '1dWaJDD+nxmkrpf2o0Semw==MbqtDbrOMcoAqtOl',
  };

export const AUTH = {
    PASSWORD: 'recruitment',
};

// data
export const initialFromValue = {
  name: '',
  content: '',
  startDate: '',
  endDate: '',
}

export const initialAdvertisements: TAdvertisement[] = [
  {
    id: '1',
    name: 'Sample Ad 1',
    content: 'This is the first sample advertisement.',
    startDate: '2024-01-01',
    endDate: '2024-02-01',
  },
  {
    id: '2',
    name: 'Sample Ad 2',
    content: 'This is the second sample advertisement.',
    startDate: '2024-03-01',
    endDate: '2024-04-01',
  },
];