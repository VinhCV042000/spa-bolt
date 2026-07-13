import { Helmet } from 'react-helmet-async';

import { Spa17SubServicesPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Dịch vụ</title>
      </Helmet>
      <Spa17SubServicesPageView />
    </>
  );
}
