import { Helmet } from 'react-helmet-async';

import { Spa11SubOffersPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Ưu đãi</title>
      </Helmet>
      <Spa11SubOffersPageView />
    </>
  );
}
