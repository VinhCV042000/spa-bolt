import { Helmet } from 'react-helmet-async';

import { Spa8PromotionsPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Khuyến mãi</title>
      </Helmet>
      <Spa8PromotionsPageView />
    </>
  );
}
