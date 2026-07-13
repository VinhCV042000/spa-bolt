import { Helmet } from 'react-helmet-async';

import { Spa5BeforeAfterPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Résultats</title>
      </Helmet>
      <Spa5BeforeAfterPageView />
    </>
  );
}
