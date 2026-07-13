import { Helmet } from 'react-helmet-async';

import { Spa9TrainingPageView } from 'src/sections/spa9/spa9-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thalassa Spa & Wellness | Training</title>
      </Helmet>
      <Spa9TrainingPageView />
    </>
  );
}
