import { Helmet } from 'react-helmet-async';

import { Spa2FeedbackPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Cảm nhận</title>
      </Helmet>
      <Spa2FeedbackPageView />
    </>
  );
}
