import { Helmet } from 'react-helmet-async';

import { Spa2PackageBuilderPageView } from 'src/sections/spa2/view/spa2-content-pages4';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Package Builder</title>
      </Helmet>
      <Spa2PackageBuilderPageView />
    </>
  );
}
