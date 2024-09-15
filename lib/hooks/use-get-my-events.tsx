import { useQuery } from '@tanstack/react-query';
import { getMyEvents } from '../actions/get-my-events';

export function useGetMyEvents() {
  return useQuery({
    queryKey: ['myEvents'],
    queryFn: getMyEvents,
  });
}