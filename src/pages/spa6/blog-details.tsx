import { Helmet } from 'react-helmet-async';

import { Spa6BlogDetailsPageView } from 'src/sections/spa6/spa6-content-pages';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Terra Heal | Article</title>
      </Helmet>
      <Spa6BlogDetailsPageView />
    </>
  );
}
