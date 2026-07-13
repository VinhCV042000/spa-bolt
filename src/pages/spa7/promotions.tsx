import { Helmet } from 'react-helmet-async';

import { Spa7SubPromotionsPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Khuyến mãi</title>
      </Helmet>
      <Spa7SubPromotionsPageView />
    </>
  );
}
