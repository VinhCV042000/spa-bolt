import { Helmet } from 'react-helmet-async';

import { Spa18SubOffersPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Ưu đãi</title>
      </Helmet>
      <Spa18SubOffersPageView />
    </>
  );
}
