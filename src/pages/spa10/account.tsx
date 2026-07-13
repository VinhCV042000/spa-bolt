import { Helmet } from 'react-helmet-async';

import { Spa10AccountPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Account</title>
      </Helmet>
      <Spa10AccountPageView />
    </>
  );
}
