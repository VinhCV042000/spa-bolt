import { Helmet } from 'react-helmet-async';

import { Spa2PromotionsPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Khuyến mãi</title>
      </Helmet>
      <Spa2PromotionsPageView />
    </>
  );
}
