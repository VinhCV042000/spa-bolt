import { Helmet } from 'react-helmet-async';

import { Spa2SpaFinderPageView } from 'src/sections/spa2/view/spa2-content-pages4';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Spa Finder</title>
      </Helmet>
      <Spa2SpaFinderPageView />
    </>
  );
}
