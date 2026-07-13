import { Helmet } from 'react-helmet-async';

import { SpaCareersPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Careers</title>
      </Helmet>
      <SpaCareersPageView />
    </>
  );
}
