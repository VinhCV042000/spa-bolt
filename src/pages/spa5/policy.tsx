import { Helmet } from 'react-helmet-async';

import { Spa5PolicyPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Politique</title>
      </Helmet>
      <Spa5PolicyPageView />
    </>
  );
}
