import { Helmet } from 'react-helmet-async';

import { Spa7SubOffersPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Ưu đãi</title>
      </Helmet>
      <Spa7SubOffersPageView />
    </>
  );
}
