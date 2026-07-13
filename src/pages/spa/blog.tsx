import { Helmet } from 'react-helmet-async';

import { SpaBlogPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Blog</title>
      </Helmet>
      <SpaBlogPageView />
    </>
  );
}
