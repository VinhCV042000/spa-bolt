import { Helmet } from 'react-helmet-async';

import { Spa10CareersPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Careers</title>
      </Helmet>
      <Spa10CareersPageView />
    </>
  );
}
