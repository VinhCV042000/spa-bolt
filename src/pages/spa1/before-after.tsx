import { Helmet } from 'react-helmet-async';

import { Spa1BeforeAfterPageView } from 'src/sections/spa1/view/spa1-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Luxe Spa | Before & After</title>
      </Helmet>
      <Spa1BeforeAfterPageView />
    </>
  );
}
