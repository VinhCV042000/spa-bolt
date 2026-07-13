import { Helmet } from 'react-helmet-async';

import { Spa5PackagesPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Forfaits</title>
      </Helmet>
      <Spa5PackagesPageView />
    </>
  );
}
