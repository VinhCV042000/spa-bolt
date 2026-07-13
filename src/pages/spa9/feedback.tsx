import { Helmet } from 'react-helmet-async';

import { Spa9FeedbackPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Feedback</title>
      </Helmet>
      <Spa9FeedbackPageView />
    </>
  );
}
