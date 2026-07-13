import { Helmet } from 'react-helmet-async';

import { Spa6PolicyPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Policies</title>
      </Helmet>
      <Spa6PolicyPageView />
    </>
  );
}
