import { Helmet } from 'react-helmet-async';

import { Spa10FaqPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | FAQ</title>
      </Helmet>
      <Spa10FaqPageView />
    </>
  );
}
