import { Helmet } from 'react-helmet-async';

import { Spa6ContactPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Contact Us</title>
      </Helmet>
      <Spa6ContactPageView />
    </>
  );
}
