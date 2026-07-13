import { Helmet } from 'react-helmet-async';

import { Spa2IngredientGuidePageView } from 'src/sections/spa2/view/spa2-content-pages5';

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Nature Spa | Ingredient Guide</title>
      </Helmet>
      <Spa2IngredientGuidePageView />
    </>
  );
}
