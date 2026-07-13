import { Helmet } from 'react-helmet-async';

import { Spa6FeedbackPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Guest Stories</title>
      </Helmet>
      <Spa6FeedbackPageView />
    </>
  );
}
