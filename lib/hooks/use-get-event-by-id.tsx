import { useQuery } from '@tanstack/react-query';
import { TEvent } from '../types';
import { getEventById } from '../actions/get-event-by-id';

export function useGetEventById(slug: string) {
  return useQuery<{ event: TEvent }, Error>({
    queryKey: ['event', slug],
    queryFn: () => getEventById(slug),
  });
}
