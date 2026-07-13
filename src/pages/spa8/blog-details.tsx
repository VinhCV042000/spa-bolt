import { Helmet } from 'react-helmet-async';

import { Spa8BlogDetailsPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Chi tiết blog</title>
      </Helmet>
      <Spa8BlogDetailsPageView />
    </>
  );
}
