import { Helmet } from 'react-helmet-async';

import { Spa10ContactPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Contact</title>
      </Helmet>
      <Spa10ContactPageView />
    </>
  );
}
