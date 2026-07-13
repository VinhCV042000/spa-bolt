import { Helmet } from 'react-helmet-async';

import { SpaTrainingPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Training</title>
      </Helmet>
      <SpaTrainingPageView />
    </>
  );
}
