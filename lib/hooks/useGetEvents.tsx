import useSWR from 'swr';
import { fetcher } from '../helper';

export function useGetEvents() {
  
  const { data, error, isLoading } = useSWR(
    "https://codemal.newwaymm.com/api/events",
    fetcher
  );

  return {
    events: data ? data.events : {},
    isLoading,
    isError: error
  };
}