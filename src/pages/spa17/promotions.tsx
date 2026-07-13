import { Helmet } from 'react-helmet-async';

import { Spa17SubPromotionsPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Khuyến mãi</title>
      </Helmet>
      <Spa17SubPromotionsPageView />
    </>
  );
}
