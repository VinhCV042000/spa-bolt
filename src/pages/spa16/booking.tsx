import { Helmet } from 'react-helmet-async';

import { Spa16SubBookingPageView } from 'src/sections/spa16/view/spa16-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Riad Al-Andalus | Đặt lịch</title>
      </Helmet>
      <Spa16SubBookingPageView />
    </>
  );
}
