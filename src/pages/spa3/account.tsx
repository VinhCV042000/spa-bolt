import { Helmet } from 'react-helmet-async';

import { Spa3AccountPageView } from 'src/sections/spa3/view/spa3-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Spa | Tài khoản</title>
      </Helmet>
      <Spa3AccountPageView />
    </>
  );
}
