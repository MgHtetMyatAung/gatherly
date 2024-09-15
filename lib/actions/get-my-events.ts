import api from '@/lib/api';

export async function getMyEvents() {
  try {
    const response = await api.get('/my_events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
}
