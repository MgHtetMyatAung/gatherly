import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../actions/get-profile';

export function useGetEvents() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });
}