import { Helmet } from 'react-helmet-async';

import { Spa3AboutPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Giới thiệu</title>
      </Helmet>
      <Spa3AboutPageView />
    </>
  );
}
