import { Helmet } from 'react-helmet-async';

import { Spa5AccountPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Mon Compte</title>
      </Helmet>
      <Spa5AccountPageView />
    </>
  );
}
