import { Helmet } from 'react-helmet-async';

import { Spa12BlogDetailsPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Blog Details</title>
      </Helmet>
      <Spa12BlogDetailsPageView />
    </>
  );
}
