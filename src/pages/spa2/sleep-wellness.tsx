import { Helmet } from 'react-helmet-async';

import { Spa2SleepWellnessPageView } from 'src/sections/spa2/view/spa2-content-pages5';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Sleep Wellness</title>
      </Helmet>
      <Spa2SleepWellnessPageView />
    </>
  );
}
