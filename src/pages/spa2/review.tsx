import { Helmet } from 'react-helmet-async';

import { Spa2ReviewPageView } from 'src/sections/spa2/view/spa2-content-pages3';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Review</title>
      </Helmet>
      <Spa2ReviewPageView />
    </>
  );
}
