import { Helmet } from 'react-helmet-async';

import { SpaServiceDetailsPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Service detail</title>
      </Helmet>
      <SpaServiceDetailsPageView />
    </>
  );
}
