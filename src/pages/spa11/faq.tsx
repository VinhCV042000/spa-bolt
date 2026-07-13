import { Helmet } from 'react-helmet-async';

import { Spa11SubFaqPageView } from 'src/sections/spa11/view/spa11-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Hammam Marrakech | FAQ</title>
      </Helmet>
      <Spa11SubFaqPageView />
    </>
  );
}
