import { Helmet } from 'react-helmet-async';

import { SpaAboutPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | About us</title>
      </Helmet>
      <SpaAboutPageView />
    </>
  );
}
