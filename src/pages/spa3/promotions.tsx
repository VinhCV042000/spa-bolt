import { Helmet } from 'react-helmet-async';

import { Spa3PromotionsPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Khuyến mãi</title>
      </Helmet>
      <Spa3PromotionsPageView />
    </>
  );
}
