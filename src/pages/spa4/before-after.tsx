import { Helmet } from 'react-helmet-async';

import { Spa4BeforeAfterPageView } from 'src/sections/spa4/spa4-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Jade Blossom Spa | Kết quả trước - sau</title>
      </Helmet>
      <Spa4BeforeAfterPageView />
    </>
  );
}
