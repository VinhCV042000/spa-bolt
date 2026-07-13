import { Helmet } from 'react-helmet-async';

import { Spa1PolicyPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Policies</title>
      </Helmet>
      <Spa1PolicyPageView />
    </>
  );
}
