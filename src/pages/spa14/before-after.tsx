import { Helmet } from 'react-helmet-async';

import { Spa14SubBeforeAfterPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Trước & Sau</title>
      </Helmet>
      <Spa14SubBeforeAfterPageView />
    </>
  );
}
