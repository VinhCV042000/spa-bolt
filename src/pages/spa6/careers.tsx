import { Helmet } from 'react-helmet-async';

import { Spa6CareersPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Careers</title>
      </Helmet>
      <Spa6CareersPageView />
    </>
  );
}
