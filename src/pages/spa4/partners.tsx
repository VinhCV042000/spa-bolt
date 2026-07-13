import { Helmet } from 'react-helmet-async';

import { Spa4PartnersPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Cộng sự</title>
      </Helmet>
      <Spa4PartnersPageView />
    </>
  );
}
