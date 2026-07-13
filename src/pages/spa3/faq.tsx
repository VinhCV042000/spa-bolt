import { Helmet } from 'react-helmet-async';

import { Spa3FaqPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | FAQ</title>
      </Helmet>
      <Spa3FaqPageView />
    </>
  );
}
