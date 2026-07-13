import { Helmet } from 'react-helmet-async';

import { Spa6AboutPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | About Us</title>
      </Helmet>
      <Spa6AboutPageView />
    </>
  );
}
