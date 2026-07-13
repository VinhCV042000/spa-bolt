import { Helmet } from 'react-helmet-async';

import { Spa6BeforeAfterPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Transformation Stories</title>
      </Helmet>
      <Spa6BeforeAfterPageView />
    </>
  );
}
