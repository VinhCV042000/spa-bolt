import { Helmet } from 'react-helmet-async';

import { Spa5AboutPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | À propos</title>
      </Helmet>
      <Spa5AboutPageView />
    </>
  );
}
