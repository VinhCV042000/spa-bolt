import { Helmet } from 'react-helmet-async';

import { Spa12FaqPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | FAQ</title>
      </Helmet>
      <Spa12FaqPageView />
    </>
  );
}
