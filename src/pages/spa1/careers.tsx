import { Helmet } from 'react-helmet-async';

import { Spa1CareersPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Careers</title>
      </Helmet>
      <Spa1CareersPageView />
    </>
  );
}
