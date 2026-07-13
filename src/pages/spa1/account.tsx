import { Helmet } from 'react-helmet-async';

import { Spa1AccountPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | My account</title>
      </Helmet>
      <Spa1AccountPageView />
    </>
  );
}
