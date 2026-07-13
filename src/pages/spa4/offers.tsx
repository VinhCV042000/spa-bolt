import { Helmet } from 'react-helmet-async';

import { Spa4OffersPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Gói ưu đãi</title>
      </Helmet>
      <Spa4OffersPageView />
    </>
  );
}
