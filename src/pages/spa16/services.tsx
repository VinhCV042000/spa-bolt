import { Helmet } from 'react-helmet-async';

import { Spa16SubServicesPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Dịch vụ</title>
      </Helmet>
      <Spa16SubServicesPageView />
    </>
  );
}
