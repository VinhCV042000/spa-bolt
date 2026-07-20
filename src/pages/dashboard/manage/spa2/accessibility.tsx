import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { useTranslate } from 'src/locales';
import { SPA2_MANAGE_CONFIGS } from 'src/sections/dashboard/spa2/manage/spa2-manage-configs';
import { Spa2GenericManageView } from 'src/sections/dashboard/spa2/manage/spa2-generic-manage-view';

export default function Page() {
  const { t } = useTranslate('spa2-manage');
  const base = SPA2_MANAGE_CONFIGS.accessibility;
  const config = {
    ...base,
    title: t('accessibility.page_title') || base.title,
    addLabel: t('accessibility.add_btn') || base.addLabel,
    breadcrumbLabel: t('accessibility.breadcrumb') || base.breadcrumbLabel,
  };
  return (
    <>
      <Helmet>
        <title>{config.title} | Spa2 - {CONFIG.appName}</title>
      </Helmet>
      <Spa2GenericManageView config={config} />
    </>
  );
}
