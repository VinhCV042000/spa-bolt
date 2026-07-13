import { Helmet } from 'react-helmet-async';

import { Spa5BlogPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Journal</title>
      </Helmet>
      <Spa5BlogPageView />
    </>
  );
}
