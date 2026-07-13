import { Helmet } from 'react-helmet-async';

import { Spa18SubPromotionsPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | Khuyến mãi</title>
      </Helmet>
      <Spa18SubPromotionsPageView />
    </>
  );
}
