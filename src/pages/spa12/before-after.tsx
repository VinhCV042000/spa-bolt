import { Helmet } from 'react-helmet-async';

import { Spa12BeforeAfterPageView } from 'src/sections/spa12/spa12-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Pearl Mansion & Spa | Before & After</title>
      </Helmet>
      <Spa12BeforeAfterPageView />
    </>
  );
}
