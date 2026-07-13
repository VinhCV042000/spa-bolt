import { Helmet } from 'react-helmet-async';

import { Spa4BookingPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Đặt lịch online</title>
      </Helmet>
      <Spa4BookingPageView />
    </>
  );
}
