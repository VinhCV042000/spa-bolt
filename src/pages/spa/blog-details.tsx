import { Helmet } from 'react-helmet-async';

import { SpaBlogDetailsPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Blog detail</title>
      </Helmet>
      <SpaBlogDetailsPageView />
    </>
  );
}
