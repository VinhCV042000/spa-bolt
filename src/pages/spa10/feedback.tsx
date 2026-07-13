import { Helmet } from 'react-helmet-async';

import { Spa10FeedbackPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Feedback</title>
      </Helmet>
      <Spa10FeedbackPageView />
    </>
  );
}
