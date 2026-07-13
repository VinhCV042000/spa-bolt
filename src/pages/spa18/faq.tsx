import { Helmet } from 'react-helmet-async';

import { Spa18SubFaqPageView } from 'src/sections/spa18/view/spa18-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jungle Haven | FAQ</title>
      </Helmet>
      <Spa18SubFaqPageView />
    </>
  );
}
