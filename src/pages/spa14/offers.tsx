import { Helmet } from 'react-helmet-async';

import { Spa14SubOffersPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Ưu đãi</title>
      </Helmet>
      <Spa14SubOffersPageView />
    </>
  );
}
