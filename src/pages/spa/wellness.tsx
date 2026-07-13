import { Helmet } from 'react-helmet-async';

import { SpaWellnessPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Wellness library</title>
      </Helmet>
      <SpaWellnessPageView />
    </>
  );
}
