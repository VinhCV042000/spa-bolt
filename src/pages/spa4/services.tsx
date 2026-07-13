import { Helmet } from 'react-helmet-async';

import { Spa4ServicesPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Dịch vụ</title>
      </Helmet>
      <Spa4ServicesPageView />
    </>
  );
}
