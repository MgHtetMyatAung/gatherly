import useSWR  from 'swr';
import { fetcher } from '../helper';
import { TEvent } from '../types';

export function useGetEventById(slug: string) {
  const { data, error, isLoading } = useSWR<{ event: TEvent }>(
    `https://codemal.newwaymm.com/api/event/${slug}`,
    fetcher
  );

  return {
    event: data?.event,
    isLoading,
    isError: error
  };
}
