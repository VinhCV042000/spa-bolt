import { Helmet } from 'react-helmet-async';

import { Spa5FaqPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | FAQ</title>
      </Helmet>
      <Spa5FaqPageView />
    </>
  );
}
