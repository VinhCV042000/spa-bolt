import { Helmet } from 'react-helmet-async';

import { Spa1PromotionsPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Promotions</title>
      </Helmet>
      <Spa1PromotionsPageView />
    </>
  );
}
