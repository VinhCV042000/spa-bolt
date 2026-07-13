import { Helmet } from 'react-helmet-async';

import { Spa10PartnersPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Partners</title>
      </Helmet>
      <Spa10PartnersPageView />
    </>
  );
}
