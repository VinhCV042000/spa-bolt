import { Helmet } from 'react-helmet-async';

import { Spa12TrainingPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Training</title>
      </Helmet>
      <Spa12TrainingPageView />
    </>
  );
}
