import { Helmet } from 'react-helmet-async';

import { Spa11SubServicesPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Dịch vụ</title>
      </Helmet>
      <Spa11SubServicesPageView />
    </>
  );
}
