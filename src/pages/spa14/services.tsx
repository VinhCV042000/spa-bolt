import { Helmet } from 'react-helmet-async';

import { Spa14SubServicesPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Dịch vụ</title>
      </Helmet>
      <Spa14SubServicesPageView />
    </>
  );
}
