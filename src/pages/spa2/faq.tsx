import { Helmet } from 'react-helmet-async';

import { Spa2FaqPageView } from 'src/sections/spa2/view/spa2-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | FAQ</title>
      </Helmet>
      <Spa2FaqPageView />
    </>
  );
}
