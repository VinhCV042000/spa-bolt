import { Helmet } from 'react-helmet-async';

import { Spa5PromotionsPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Promotions</title>
      </Helmet>
      <Spa5PromotionsPageView />
    </>
  );
}
