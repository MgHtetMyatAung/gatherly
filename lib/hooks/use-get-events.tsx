import { useQuery } from '@tanstack/react-query';
import { getEvents } from '../actions/get-events';

export function useGetEvents() {
  return useQuery({
    queryKey: ['events'],
    queryFn: getEvents,
  });
}