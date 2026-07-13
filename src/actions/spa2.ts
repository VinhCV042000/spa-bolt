import type { Spa2PageKey, Spa2PageParams } from 'src/api/spa2/types';

import useSWR from 'swr';
import { useMemo } from 'react';

import { getSpa2PageConfig } from 'src/api/spa2/pages-config';
import { fetchSpa2PageData } from 'src/api/spa2/fetch-spa2-data';

// ----------------------------------------------------------------------

const swrOptions = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

// ----------------------------------------------------------------------

type Spa2SwrKey = [string, Spa2PageKey, Spa2PageParams | undefined];

async function spa2Fetcher([, pageKey, params]: Spa2SwrKey) {
  return fetchSpa2PageData(pageKey, params);
}

export function useSpa2PageData<T = unknown>(pageKey: Spa2PageKey, params?: Spa2PageParams) {
  const config = getSpa2PageConfig(pageKey);

  const swrKey: Spa2SwrKey | null = pageKey ? ['spa2-page', pageKey, params] : null;

  const {
    data: result,
    isLoading,
    error,
    isValidating,
    mutate,
  } = useSWR(swrKey, spa2Fetcher, swrOptions);

  const memoizedValue = useMemo(
    () => ({
      config,
      data: (result?.data ?? config.getMockData(params)) as T,
      source: result?.source ?? ('mock' as const),
      loading: isLoading,
      error,
      validating: isValidating,
      refresh: mutate,
      isMock: result?.source === 'mock' || !!error,
    }),
    [config, result, params, isLoading, error, isValidating, mutate]
  );

  return memoizedValue;
}
