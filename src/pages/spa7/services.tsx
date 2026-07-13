import { Helmet } from 'react-helmet-async';

import { Spa7SubServicesPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Dịch vụ</title>
      </Helmet>
      <Spa7SubServicesPageView />
    </>
  );
}
