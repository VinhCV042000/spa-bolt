import { Helmet } from 'react-helmet-async';

import { Spa4BlogPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Blog</title>
      </Helmet>
      <Spa4BlogPageView />
    </>
  );
}
