import { Helmet } from 'react-helmet-async';

import { Spa17SubOffersPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Ưu đãi</title>
      </Helmet>
      <Spa17SubOffersPageView />
    </>
  );
}
