import { Helmet } from 'react-helmet-async';

import { Spa6PromotionsPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Promotions</title>
      </Helmet>
      <Spa6PromotionsPageView />
    </>
  );
}
