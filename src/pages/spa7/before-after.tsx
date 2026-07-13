import { Helmet } from 'react-helmet-async';

import { Spa7SubBeforeAfterPageView } from 'src/sections/spa7/view/spa7-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Noir & Rose | Trước & Sau</title>
      </Helmet>
      <Spa7SubBeforeAfterPageView />
    </>
  );
}
