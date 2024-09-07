import api from '@/lib/api';
import { TEvent } from '@/lib/types';

export const getEventById = async (slug: string): Promise<{ event: TEvent }> => {
  try {
    const response = await api.get(`/event/${slug}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch event');
  }
};
