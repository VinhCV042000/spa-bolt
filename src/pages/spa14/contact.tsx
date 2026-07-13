import { Helmet } from 'react-helmet-async';

import { Spa14SubContactPageView } from 'src/sections/spa14/view/spa14-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Imperial Vienna | Liên hệ</title>
      </Helmet>
      <Spa14SubContactPageView />
    </>
  );
}
