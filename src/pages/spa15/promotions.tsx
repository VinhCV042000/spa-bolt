import { Helmet } from 'react-helmet-async';

import { useTranslate } from 'src/locales';

import { Spa15PromotionsView } from 'src/sections/spa15/spa15-content-pages';

export default function Page() {
  const { t } = useTranslate('spa15');
  return (
    <>
      <Helmet>
        <title>Sakura Onsen Ryokan | {t('promotions.pageTitle')}</title>
      </Helmet>
      <Spa15PromotionsView />
    </>
  );
}
