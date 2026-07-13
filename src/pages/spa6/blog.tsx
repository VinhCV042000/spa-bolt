import { Helmet } from 'react-helmet-async';

import { Spa6BlogPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Wellness Journal</title>
      </Helmet>
      <Spa6BlogPageView />
    </>
  );
}
