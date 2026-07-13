import { Helmet } from 'react-helmet-async';

import { Spa2BlogPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Blog</title>
      </Helmet>
      <Spa2BlogPageView />
    </>
  );
}
