import { Helmet } from 'react-helmet-async';

import { Spa14SubPromotionsPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Khuyến mãi</title>
      </Helmet>
      <Spa14SubPromotionsPageView />
    </>
  );
}
