import { Helmet } from 'react-helmet-async';

import { Spa4PromotionsPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Khuyến mãi</title>
      </Helmet>
      <Spa4PromotionsPageView />
    </>
  );
}
