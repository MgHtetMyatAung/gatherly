import api from '@/lib/api';

export async function getEvents() {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}
