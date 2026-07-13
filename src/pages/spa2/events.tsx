import { Helmet } from 'react-helmet-async';

import { Spa2EventsPageView } from 'src/sections/spa2/view/spa2-content-pages2';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | EventsPage</title>
      </Helmet>
      <Spa2EventsPageView />
    </>
  );
}
