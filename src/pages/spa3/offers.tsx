import { Helmet } from 'react-helmet-async';

import { Spa3OffersPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Ưu đãi</title>
      </Helmet>
      <Spa3OffersPageView />
    </>
  );
}
