import { Helmet } from 'react-helmet-async';

import { Spa4FaqPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | FAQ</title>
      </Helmet>
      <Spa4FaqPageView />
    </>
  );
}
