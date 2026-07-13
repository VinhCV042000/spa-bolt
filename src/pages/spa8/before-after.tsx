import { Helmet } from 'react-helmet-async';

import { Spa8BeforeAfterPageView } from 'src/sections/spa8/spa8-content-pages';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Amaya Onsen | Kết quả trước-sau</title>
      </Helmet>
      <Spa8BeforeAfterPageView />
    </>
  );
}
