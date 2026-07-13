import { Helmet } from 'react-helmet-async';

import { Spa17SubPartnersPageView } from 'src/sections/spa17/view/spa17-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Crystal Glow | Đối tác</title>
      </Helmet>
      <Spa17SubPartnersPageView />
    </>
  );
}
