import { Helmet } from 'react-helmet-async';

import { Spa2OffersPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Ưu đãi</title>
      </Helmet>
      <Spa2OffersPageView />
    </>
  );
}
