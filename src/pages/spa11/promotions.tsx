import { Helmet } from 'react-helmet-async';

import { Spa11SubPromotionsPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | Khuyến mãi</title>
      </Helmet>
      <Spa11SubPromotionsPageView />
    </>
  );
}
