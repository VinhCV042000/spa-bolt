import { Helmet } from 'react-helmet-async';

import { Spa18SubServicesPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Dịch vụ</title>
      </Helmet>
      <Spa18SubServicesPageView />
    </>
  );
}
