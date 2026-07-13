import { Helmet } from 'react-helmet-async';

import { Spa10PromotionsPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Promotions</title>
      </Helmet>
      <Spa10PromotionsPageView />
    </>
  );
}
