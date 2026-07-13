import { Helmet } from 'react-helmet-async';

import { Spa12BlogPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Blog</title>
      </Helmet>
      <Spa12BlogPageView />
    </>
  );
}
