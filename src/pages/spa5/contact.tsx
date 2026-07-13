import { Helmet } from 'react-helmet-async';

import { Spa5ContactPageView } from 'src/sections/spa5/spa5-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Lumière Balnéo | Contact</title>
      </Helmet>
      <Spa5ContactPageView />
    </>
  );
}
