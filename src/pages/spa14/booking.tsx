import { Helmet } from 'react-helmet-async';

import { Spa14SubBookingPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Đặt lịch</title>
      </Helmet>
      <Spa14SubBookingPageView />
    </>
  );
}
