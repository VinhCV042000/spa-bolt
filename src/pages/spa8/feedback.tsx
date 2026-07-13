import { Helmet } from 'react-helmet-async';

import { Spa8FeedbackPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Phản hồi khách hàng</title>
      </Helmet>
      <Spa8FeedbackPageView />
    </>
  );
}
