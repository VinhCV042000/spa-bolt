import { Helmet } from 'react-helmet-async';

import { Spa10AboutPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | About</title>
      </Helmet>
      <Spa10AboutPageView />
    </>
  );
}
