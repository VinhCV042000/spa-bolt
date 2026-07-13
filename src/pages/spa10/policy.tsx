import { Helmet } from 'react-helmet-async';

import { Spa10PolicyPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Policy</title>
      </Helmet>
      <Spa10PolicyPageView />
    </>
  );
}
