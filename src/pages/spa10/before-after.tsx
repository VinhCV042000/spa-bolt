import { Helmet } from 'react-helmet-async';

import { Spa10BeforeAfterPageView } from 'src/sections/spa10/spa10-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nordic Spa & Wellness | Before & After</title>
      </Helmet>
      <Spa10BeforeAfterPageView />
    </>
  );
}
