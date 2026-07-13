import { Helmet } from 'react-helmet-async';

import { Spa5PartnersPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Partenaires</title>
      </Helmet>
      <Spa5PartnersPageView />
    </>
  );
}
