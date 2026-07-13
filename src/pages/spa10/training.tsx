import { Helmet } from 'react-helmet-async';

import { Spa10TrainingPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Training</title>
      </Helmet>
      <Spa10TrainingPageView />
    </>
  );
}
