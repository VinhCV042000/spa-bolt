import { Helmet } from 'react-helmet-async';

import { Spa4PackagesPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Gói liệu trình</title>
      </Helmet>
      <Spa4PackagesPageView />
    </>
  );
}
