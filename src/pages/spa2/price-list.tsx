import { Helmet } from 'react-helmet-async';

import { Spa2PriceListPageView } from 'src/sections/spa2/view/spa2-content-pages9';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Bảng giá</title>
      </Helmet>
      <Spa2PriceListPageView />
    </>
  );
}
