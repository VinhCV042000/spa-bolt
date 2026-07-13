import { Helmet } from 'react-helmet-async';

import { Spa12FeedbackPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Feedback</title>
      </Helmet>
      <Spa12FeedbackPageView />
    </>
  );
}
