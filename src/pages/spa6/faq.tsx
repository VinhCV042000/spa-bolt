import { Helmet } from 'react-helmet-async';

import { Spa6FaqPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | FAQ</title>
      </Helmet>
      <Spa6FaqPageView />
    </>
  );
}
