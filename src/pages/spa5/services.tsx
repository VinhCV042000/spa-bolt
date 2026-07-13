import { Helmet } from 'react-helmet-async';

import { Spa5ServicesPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Soins</title>
      </Helmet>
      <Spa5ServicesPageView />
    </>
  );
}
