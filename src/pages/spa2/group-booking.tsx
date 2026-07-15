import { Helmet } from 'react-helmet-async';

import { Spa2GroupBookingPageView } from 'src/sections/spa2/view/spa2-content-pages8';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Đặt chỗ nhóm</title>
      </Helmet>
      <Spa2GroupBookingPageView />
    </>
  );
}
