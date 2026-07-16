import axiosInstance from 'src/utils/axios';

import { getSpa2PageConfig, type SPA2_PAGE_CONFIGS } from './pages-config';

import type { Spa2DataSource, Spa2PageParams } from './types';

// ----------------------------------------------------------------------

export async function fetchSpa2PageData<T = unknown>(
  pageKey: string,
  params?: Spa2PageParams
): Promise<{ data: T; source: Spa2DataSource }> {
  const config = getSpa2PageConfig(pageKey as keyof typeof SPA2_PAGE_CONFIGS);
  const mockData = config.getMockData(params) as T;
  const endpoint = config.endpoint(params);

  if (!endpoint || endpoint.endsWith('/')) {
    return { data: mockData, source: 'mock' };
  }

  try {
    const response = await axiosInstance.get<T>(endpoint);
    return { data: response.data ?? mockData, source: 'api' };
  } catch {
    return { data: mockData, source: 'mock' };
  }
}
