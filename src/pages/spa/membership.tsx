import { Helmet } from 'react-helmet-async';

import { SpaMembershipPageView } from 'src/sections/spa/view/spa-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Serenity Spa | Membership</title>
      </Helmet>
      <SpaMembershipPageView />
    </>
  );
}
