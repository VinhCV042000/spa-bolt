import { Helmet } from 'react-helmet-async';

import { Spa2WaitlistPageView } from 'src/sections/spa2/view/spa2-content-pages9';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Danh sách chờ</title>
      </Helmet>
      <Spa2WaitlistPageView />
    </>
  );
}
