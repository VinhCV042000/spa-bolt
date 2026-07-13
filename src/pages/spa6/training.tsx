import { Helmet } from 'react-helmet-async';

import { Spa6TrainingPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Training Programs</title>
      </Helmet>
      <Spa6TrainingPageView />
    </>
  );
}
