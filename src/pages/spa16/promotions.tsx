import { Helmet } from 'react-helmet-async';

import { Spa16SubPromotionsPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Khuyến mãi</title>
      </Helmet>
      <Spa16SubPromotionsPageView />
    </>
  );
}
