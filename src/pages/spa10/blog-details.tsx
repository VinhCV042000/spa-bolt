import { Helmet } from 'react-helmet-async';

import { Spa10BlogDetailsPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Blog Details</title>
      </Helmet>
      <Spa10BlogDetailsPageView />
    </>
  );
}
