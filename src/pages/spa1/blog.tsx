import { Helmet } from 'react-helmet-async';

import { Spa1BlogPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Blog</title>
      </Helmet>
      <Spa1BlogPageView />
    </>
  );
}
