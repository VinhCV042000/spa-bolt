import { Helmet } from 'react-helmet-async';

import { Spa17SubBookingPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Đặt lịch</title>
      </Helmet>
      <Spa17SubBookingPageView />
    </>
  );
}
