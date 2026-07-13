import { Helmet } from 'react-helmet-async';

import { SpaContactPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Contact</title>
      </Helmet>
      <SpaContactPageView />
    </>
  );
}
