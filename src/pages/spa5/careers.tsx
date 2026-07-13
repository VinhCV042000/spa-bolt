import { Helmet } from 'react-helmet-async';

import { Spa5CareersPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Carrières</title>
      </Helmet>
      <Spa5CareersPageView />
    </>
  );
}
