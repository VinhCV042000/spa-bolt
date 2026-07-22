import type {
  Spa2PolicyTier,
  Spa2PolicyCard,
  Spa2PolicyAlert,
  Spa2PolicyCertChip,
  Spa2PolicyTableRow,
  Spa2PolicyArticleContent,
  Spa2PolicyTimelineStep,
} from 'src/_mock/_spa2';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Alert from '@mui/material/Alert';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TableContainer from '@mui/material/TableContainer';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';

import { useTranslate } from 'src/locales';
import { spa2PolicyBanner, spa2PolicyArticles, spa2PolicyArticleContent } from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';

import {
  Spa2SoftCard,
  Spa2PolicyListItem,
  Spa2PolicyCardBlock,
  Spa2PolicyPageView,
  Spa2PolicySectionHeader,
  Spa2PolicyTimelineStepBlock,
} from 'src/sections/spa2/view/spa2-content-pages';
import {
  SPA2_INK,
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2ListAnalytic } from './spa2-list-analytic';

// ─────────────────────────────────────────────────────────────────────────────
// Manages every block the public /spa2/policy page (Spa2PolicyPageView) renders:
// the hero (eyebrow / 3-line title / subtitle / version label), the 4 highlight
// cards, the 7-item sticky nav (label/icon/article number/order) and, for each
// of the 7 articles, its full body content (cards, comparison table, refund
// timeline, membership tiers, plain lists, certification chips and the
// closing alert) via `spa2PolicyArticleContent`. The public page renders that
// content generically off the same data, so edits here are reflected exactly.
// ─────────────────────────────────────────────────────────────────────────────

type Article = (typeof spa2PolicyArticles)[number];
type Highlight = (typeof spa2PolicyBanner.highlights)[number];
type ContentMap = Record<string, Spa2PolicyArticleContent>;

const cloneArticleContent = (): ContentMap =>
  Object.fromEntries(
    Object.entries(spa2PolicyArticleContent).map(([id, c]) => [
      id,
      {
        ...c,
        cards: c.cards?.map((x) => ({ ...x })),
        tableRows: c.tableRows?.map((x) => ({ ...x })),
        timelineSteps: c.timelineSteps?.map((x) => ({ ...x })),
        tiers: c.tiers?.map((x) => ({ ...x, perks: [...x.perks] })),
        listItems: c.listItems ? [...c.listItems] : undefined,
        certChips: c.certChips?.map((x) => ({ ...x })),
        alert: c.alert ? { ...c.alert } : undefined,
      },
    ])
  );

function PreviewFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string | number }) {
  return (
    <Card sx={{ p: 2, borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
      <Box
        sx={{
          width: 40,
          height: 40,
          borderRadius: 2,
          bgcolor: SPA2_CREAM,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Iconify icon={icon} width={20} sx={{ color: SPA2_TEAL }} />
      </Box>
      <Box>
        <Typography variant="h6" sx={{ color: SPA2_INK, lineHeight: 1.2 }}>
          {value}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {label}
        </Typography>
      </Box>
    </Card>
  );
}

// Mirrors the public page's per-article render block exactly, so what admins
// see here (per-tab preview and the full "Xem trước" tab) matches production.
function ArticleBody({
  article,
  data,
  privacyAgreed,
  onPrivacyChange,
}: {
  article: Article;
  data: Spa2PolicyArticleContent;
  privacyAgreed: boolean;
  onPrivacyChange: (v: boolean) => void;
}) {
  return (
    <Box sx={{ mb: 2 }}>
      <Spa2PolicySectionHeader
        id=""
        icon={article.icon}
        title={data.title}
        article={article.article}
      />

      {data.cards && (
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {data.cards.map((c, i) => (
            <Grid key={`${c.title}-${i}`} xs={12} sm={data.cards!.length === 3 ? 4 : 6}>
              <Spa2PolicyCardBlock icon={c.icon} title={c.title} desc={c.desc} />
            </Grid>
          ))}
        </Grid>
      )}

      {data.tableRows && (
        <TableContainer
          component={Card}
          sx={{
            borderRadius: 3,
            border: `0.5px solid ${SPA2_CREAM_DARK}`,
            boxShadow: 'none',
            mb: 2,
          }}
        >
          <Table size="small">
            <TableHead>
              <TableRow sx={{ bgcolor: SPA2_CREAM }}>
                {['Thời điểm hủy', 'Phí hủy', 'Hoàn tiền', 'Đổi lịch'].map((h) => (
                  <TableCell key={h} sx={{ fontWeight: 600, color: SPA2_TEAL_DARK, fontSize: 13 }}>
                    {h}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.tableRows.map((row, i) => (
                <TableRow
                  key={`${row.time}-${i}`}
                  sx={{ '&:last-child td': { border: 0 }, '&:hover td': { bgcolor: SPA2_CREAM } }}
                >
                  <TableCell sx={{ fontSize: 13, fontWeight: 500, color: SPA2_INK }}>
                    {row.time}
                  </TableCell>
                  <TableCell sx={{ fontSize: 13, color: 'text.secondary' }}>{row.fee}</TableCell>
                  <TableCell>
                    {row.refund === 'Không' ? (
                      <Iconify
                        icon="solar:close-circle-bold"
                        sx={{ color: 'error.main' }}
                        width={16}
                      />
                    ) : (
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          sx={{ color: SPA2_TEAL }}
                          width={16}
                        />
                        <Typography sx={{ fontSize: 13, color: SPA2_TEAL }}>
                          {row.refund}
                        </Typography>
                      </Stack>
                    )}
                  </TableCell>
                  <TableCell>
                    {row.change === 'Không' ? (
                      <Iconify
                        icon="solar:close-circle-bold"
                        sx={{ color: 'error.main' }}
                        width={16}
                      />
                    ) : (
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Iconify
                          icon="solar:check-circle-bold"
                          sx={{ color: SPA2_TEAL }}
                          width={16}
                        />
                        <Typography sx={{ fontSize: 13, color: SPA2_TEAL }}>
                          {row.change}
                        </Typography>
                      </Stack>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {data.timelineSteps && (
        <Box sx={{ mb: 3 }}>
          {data.timelineSteps.map((s, i) => (
            <Spa2PolicyTimelineStepBlock
              key={`${s.title}-${i}`}
              title={s.title}
              desc={s.desc}
              last={i === data.timelineSteps!.length - 1}
            />
          ))}
        </Box>
      )}

      {data.tiers && (
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {data.tiers.map((tier, i) => (
            <Grid key={`${tier.label}-${i}`} xs={12} sm={4}>
              <Card
                sx={{
                  p: 2.5,
                  borderRadius: 3,
                  border: `0.5px solid ${SPA2_CREAM_DARK}`,
                  borderTop: `3px solid ${tier.color}`,
                  boxShadow: 'none',
                  height: '100%',
                }}
              >
                <Typography sx={{ fontWeight: 600, fontSize: 14, color: tier.textColor, mb: 1.5 }}>
                  {tier.label}
                </Typography>
                <Stack component="ul" sx={{ listStyle: 'none', gap: 0.75 }}>
                  {tier.perks.map((p, pi) => (
                    <Spa2PolicyListItem key={`${p}-${pi}`}>{p}</Spa2PolicyListItem>
                  ))}
                </Stack>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {data.listItems && (
        <Stack component="ul" sx={{ listStyle: 'none', gap: 1 }}>
          {data.listItems.map((item, i) => (
            <Spa2PolicyListItem key={`${item}-${i}`}>{item}</Spa2PolicyListItem>
          ))}
        </Stack>
      )}

      {data.certChips && (
        <Box sx={{ mt: 3 }}>
          <Typography sx={{ fontSize: 13, color: 'text.secondary', mb: 1.5 }}>
            Chứng nhận hiện có:
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ gap: 1 }}>
            {data.certChips.map((c, i) => (
              <Chip
                key={`${c.label}-${i}`}
                label={c.label}
                icon={<Iconify icon={c.icon} width={14} />}
                size="small"
                sx={{
                  bgcolor: SPA2_CREAM,
                  color: SPA2_TEAL_DARK,
                  border: `1px solid ${SPA2_CREAM_DARK}`,
                  '& .MuiChip-icon': { color: SPA2_TEAL },
                }}
              />
            ))}
          </Stack>
        </Box>
      )}

      {article.id === 'privacy' && (
        <Card
          sx={{
            p: 2.5,
            borderRadius: 3,
            bgcolor: SPA2_CREAM,
            border: `1px solid ${SPA2_CREAM_DARK}`,
            boxShadow: 'none',
            mt: data.cards ? 0 : 2,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={privacyAgreed}
                onChange={(e) => onPrivacyChange(e.target.checked)}
                sx={{ color: SPA2_TEAL, '&.Mui-checked': { color: SPA2_TEAL } }}
              />
            }
            label={
              <Typography
                sx={{
                  fontSize: 13,
                  color: privacyAgreed ? SPA2_TEAL_DARK : 'text.secondary',
                  lineHeight: 1.65,
                }}
              >
                Tôi đã đọc và đồng ý với chính sách bảo mật thông tin của Nature Spa. Tôi hiểu rằng
                mình có thể yêu cầu xóa dữ liệu bất kỳ lúc nào qua{' '}
                <Link href="mailto:privacy@naturespa.vn" sx={{ color: SPA2_TEAL }}>
                  privacy@naturespa.vn
                </Link>
                .
              </Typography>
            }
          />
        </Card>
      )}

      {data.alert && (
        <Alert
          icon={
            <Iconify
              icon={
                data.alert.severity === 'warning'
                  ? 'solar:danger-triangle-bold'
                  : data.alert.severity === 'success'
                    ? 'solar:check-circle-bold'
                    : 'solar:info-circle-bold'
              }
            />
          }
          severity={data.alert.severity}
          sx={{
            borderRadius: 2.5,
            mt: article.id === 'privacy' ? 2 : 0,
            ...(data.alert.severity === 'info' && {
              bgcolor: '#EBF5FF',
              color: '#0C447C',
              '& .MuiAlert-icon': { color: '#378ADD' },
            }),
          }}
        >
          {data.alert.text}
        </Alert>
      )}
    </Box>
  );
}

export function Spa2PolicyManageView() {
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2PolicyBanner,
    titleLines: [...spa2PolicyBanner.titleLines],
    highlights: spa2PolicyBanner.highlights.map((h) => ({ ...h })),
  }));
  const [articles, setArticles] = useState<Article[]>(spa2PolicyArticles);
  const [content, setContent] = useState<ContentMap>(cloneArticleContent);
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<string>('banner');
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ label: '', icon: '', article: '' });
  const [previewPrivacyAgreed, setPreviewPrivacyAgreed] = useState(false);

  const updateBanner = (key: 'eyebrow' | 'subtitle' | 'versionLabel', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  };
  const updateTitleLines = (value: string) => {
    setBanner((prev) => ({ ...prev, titleLines: value.split('\n') }));
    setDirty(true);
  };
  const updateHighlight = (idx: number, key: keyof Highlight, value: string) => {
    setBanner((prev) => ({
      ...prev,
      highlights: prev.highlights.map((h, i) => (i === idx ? { ...h, [key]: value } : h)),
    }));
    setDirty(true);
  };
  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };
  const handleReset = () => {
    setBanner({
      ...spa2PolicyBanner,
      titleLines: [...spa2PolicyBanner.titleLines],
      highlights: spa2PolicyBanner.highlights.map((h) => ({ ...h })),
    });
    setArticles(spa2PolicyArticles);
    setContent(cloneArticleContent());
    setDirty(false);
  };

  const openEdit = (item: Article) => {
    setForm({ label: item.label, icon: item.icon, article: item.article });
    setEditId(item.id);
  };

  const handleSubmit = useCallback(() => {
    setArticles((p) => p.map((x) => (x.id === editId ? { ...x, ...form } : x)));
    setEditId(null);
    setDirty(true);
  }, [form, editId]);

  const handleMoveUp = useCallback((id: string) => {
    setArticles((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx <= 0) return p;
      const next = [...p];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
    setDirty(true);
  }, []);

  const handleMoveDown = useCallback((id: string) => {
    setArticles((p) => {
      const idx = p.findIndex((x) => x.id === id);
      if (idx >= p.length - 1) return p;
      const next = [...p];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
    setDirty(true);
  }, []);

  // ── generic content-field helpers (keyed by article id) ──
  const updateContent = (articleId: string, patch: Partial<Spa2PolicyArticleContent>) => {
    setContent((prev) => ({ ...prev, [articleId]: { ...prev[articleId], ...patch } }));
    setDirty(true);
  };

  const updateTitle = (articleId: string, value: string) =>
    updateContent(articleId, { title: value });

  const updateCard = (articleId: string, idx: number, key: keyof Spa2PolicyCard, value: string) => {
    const cards = (content[articleId].cards ?? []).map((c, i) =>
      i === idx ? { ...c, [key]: value } : c
    );
    updateContent(articleId, { cards });
  };
  const addCard = (articleId: string) => {
    const cards = [
      ...(content[articleId].cards ?? []),
      { icon: 'solar:star-bold', title: '', desc: '' },
    ];
    updateContent(articleId, { cards });
  };
  const removeCard = (articleId: string, idx: number) => {
    updateContent(articleId, {
      cards: (content[articleId].cards ?? []).filter((_, i) => i !== idx),
    });
  };

  const updateTableRow = (
    articleId: string,
    idx: number,
    key: keyof Spa2PolicyTableRow,
    value: string
  ) => {
    const tableRows = (content[articleId].tableRows ?? []).map((r, i) =>
      i === idx ? { ...r, [key]: value } : r
    );
    updateContent(articleId, { tableRows });
  };
  const addTableRow = (articleId: string) => {
    const tableRows = [
      ...(content[articleId].tableRows ?? []),
      { time: '', fee: '', refund: '', change: '' },
    ];
    updateContent(articleId, { tableRows });
  };
  const removeTableRow = (articleId: string, idx: number) => {
    updateContent(articleId, {
      tableRows: (content[articleId].tableRows ?? []).filter((_, i) => i !== idx),
    });
  };

  const updateTimelineStep = (
    articleId: string,
    idx: number,
    key: keyof Spa2PolicyTimelineStep,
    value: string
  ) => {
    const timelineSteps = (content[articleId].timelineSteps ?? []).map((s, i) =>
      i === idx ? { ...s, [key]: value } : s
    );
    updateContent(articleId, { timelineSteps });
  };
  const addTimelineStep = (articleId: string) => {
    const timelineSteps = [...(content[articleId].timelineSteps ?? []), { title: '', desc: '' }];
    updateContent(articleId, { timelineSteps });
  };
  const removeTimelineStep = (articleId: string, idx: number) => {
    updateContent(articleId, {
      timelineSteps: (content[articleId].timelineSteps ?? []).filter((_, i) => i !== idx),
    });
  };

  const updateTier = (
    articleId: string,
    idx: number,
    key: 'label' | 'color' | 'textColor',
    value: string
  ) => {
    const tiers = (content[articleId].tiers ?? []).map((tr, i) =>
      i === idx ? { ...tr, [key]: value } : tr
    );
    updateContent(articleId, { tiers });
  };
  const addTier = (articleId: string) => {
    const tiers: Spa2PolicyTier[] = [
      ...(content[articleId].tiers ?? []),
      { label: '', color: '#2E8B7A', textColor: '#1D6B5C', perks: [] },
    ];
    updateContent(articleId, { tiers });
  };
  const removeTier = (articleId: string, idx: number) => {
    updateContent(articleId, {
      tiers: (content[articleId].tiers ?? []).filter((_, i) => i !== idx),
    });
  };

  const updateListItem = (articleId: string, idx: number, value: string) => {
    const listItems = (content[articleId].listItems ?? []).map((it, i) => (i === idx ? value : it));
    updateContent(articleId, { listItems });
  };
  const addListItem = (articleId: string) => {
    updateContent(articleId, { listItems: [...(content[articleId].listItems ?? []), ''] });
  };
  const removeListItem = (articleId: string, idx: number) => {
    updateContent(articleId, {
      listItems: (content[articleId].listItems ?? []).filter((_, i) => i !== idx),
    });
  };

  const updateTierPerk = (articleId: string, tierIdx: number, perkIdx: number, value: string) => {
    const tiers = (content[articleId].tiers ?? []).map((tr, i) =>
      i === tierIdx ? { ...tr, perks: tr.perks.map((p, pi) => (pi === perkIdx ? value : p)) } : tr
    );
    updateContent(articleId, { tiers });
  };
  const addTierPerk = (articleId: string, tierIdx: number) => {
    const tiers = (content[articleId].tiers ?? []).map((tr, i) =>
      i === tierIdx ? { ...tr, perks: [...tr.perks, ''] } : tr
    );
    updateContent(articleId, { tiers });
  };
  const removeTierPerk = (articleId: string, tierIdx: number, perkIdx: number) => {
    const tiers = (content[articleId].tiers ?? []).map((tr, i) =>
      i === tierIdx ? { ...tr, perks: tr.perks.filter((_, pi) => pi !== perkIdx) } : tr
    );
    updateContent(articleId, { tiers });
  };

  const updateCertChip = (
    articleId: string,
    idx: number,
    key: keyof Spa2PolicyCertChip,
    value: string
  ) => {
    const certChips = (content[articleId].certChips ?? []).map((c, i) =>
      i === idx ? { ...c, [key]: value } : c
    );
    updateContent(articleId, { certChips });
  };
  const addCertChip = (articleId: string) => {
    const certChips = [
      ...(content[articleId].certChips ?? []),
      { label: '', icon: 'solar:verified-check-bold' },
    ];
    updateContent(articleId, { certChips });
  };
  const removeCertChip = (articleId: string, idx: number) => {
    updateContent(articleId, {
      certChips: (content[articleId].certChips ?? []).filter((_, i) => i !== idx),
    });
  };

  const updateAlertSeverity = (articleId: string, severity: Spa2PolicyAlert['severity']) => {
    const cur = content[articleId].alert ?? { severity: 'info' as const, text: '' };
    updateContent(articleId, { alert: { ...cur, severity } });
  };
  const updateAlertText = (articleId: string, text: string) => {
    const cur = content[articleId].alert ?? { severity: 'info' as const, text: '' };
    updateContent(articleId, { alert: { ...cur, text } });
  };

  // ── overview stats ──
  const countArticleItems = (c: Spa2PolicyArticleContent) =>
    (c.cards?.length ?? 0) +
    (c.tableRows?.length ?? 0) +
    (c.timelineSteps?.length ?? 0) +
    (c.tiers?.length ?? 0) +
    (c.listItems?.length ?? 0) +
    (c.certChips?.length ?? 0);
  const contentValues = Object.values(content);
  const totalItems = contentValues.reduce((sum, c) => sum + countArticleItems(c), 0);
  const withAlert = contentValues.filter((c) => !!c.alert).length;
  const byArticle = articles.map((a) => ({
    ...a,
    count: content[a.id] ? countArticleItems(content[a.id]) : 0,
    hasAlert: !!content[a.id]?.alert,
  }));

  return (
    <Spa2ManageShell
      title={t('policy.page_title')}
      description="Banner, highlight cards, nhãn điều khoản và nội dung từng điều khoản hiển thị trên trang Chính sách công khai."
      breadcrumbLabel={t('nav.policy')}
      publicPath={paths.spa2.policy}
      actions={
        <>
          <Button
            variant="outlined"
            onClick={handleReset}
            disabled={!dirty}
            sx={{
              borderRadius: 50,
              px: 2.5,
              color: 'common.white',
              border: '1.5px solid rgba(255,255,255,0.7)',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.12)', borderColor: 'common.white' },
            }}
          >
            {t('common.discard_changes')}
          </Button>
          <Button
            variant="contained"
            onClick={handleSave}
            startIcon={<Iconify icon="solar:diskette-bold" />}
            sx={{
              borderRadius: 50,
              px: 3,
              bgcolor: 'common.white',
              color: SPA2_TEAL,
              '&:hover': { bgcolor: 'rgba(255,255,255,0.88)' },
            }}
          >
            {t('common.save_changes')}
          </Button>
        </>
      }
    >
      <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
        {dirty && (
          <Chip
            size="small"
            variant="soft"
            color="warning"
            label={t('common.unsaved_changes')}
            icon={<Iconify icon="solar:pen-bold" width={14} />}
          />
        )}
        {savedAt && !dirty && (
          <Chip
            size="small"
            variant="soft"
            color="success"
            label={t('common.saved_at', { time: savedAt.toLocaleTimeString('vi-VN') })}
            icon={<Iconify icon="solar:check-circle-bold" width={14} />}
          />
        )}
      </Stack>

      <Tabs
        value={tab}
        onChange={(_, v: string) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          position: 'sticky',
          top: 65,
          zIndex: 10,
          bgcolor: 'background.paper',
          '& .MuiTab-root': { minHeight: 56, fontWeight: 600 },
          '& .Mui-selected': { color: `${SPA2_TEAL_DARK} !important` },
          '& .MuiTabs-indicator': { bgcolor: SPA2_TEAL },
        }}
      >
        <Tab
          value="banner"
          label={t('policy.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        {articles.map((a) => (
          <Tab
            key={a.id}
            value={a.id}
            label={a.label}
            icon={<Iconify icon={a.icon} width={20} />}
            iconPosition="start"
          />
        ))}
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner - eyebrow/title/subtitle/version + highlight cards + nav order */}
      {tab === 'banner' && (
        <Stack spacing={2.5}>
          <Grid container spacing={2}>
            <Grid xs={12} md={8}>
              <Card sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2, height: '100%' }}>
                <Typography
                  variant="overline"
                  sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
                >
                  {t('policy.stat_by_article')}
                </Typography>
                <Scrollbar sx={{ maxHeight: 120 }}>
                  <Stack
                    direction="row"
                    divider={
                      <Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />
                    }
                    spacing={2}
                    sx={{ py: 1 }}
                  >
                    {byArticle.map((a) => (
                      <Spa2ListAnalytic
                        key={a.id}
                        icon={a.icon}
                        title={a.label}
                        total={a.count}
                        percent={totalItems ? (a.count / totalItems) * 100 : 0}
                        active={tab === a.id}
                        onClick={() => setTab(a.id)}
                        secondaryLine={
                          a.hasAlert ? (
                            <Box component="span" sx={{ fontSize: 12, color: 'warning.main' }}>
                              ⚠ {t('policy.stat_with_alert')}
                            </Box>
                          ) : undefined
                        }
                      />
                    ))}
                  </Stack>
                </Scrollbar>
              </Card>
            </Grid>
            <Grid xs={6} md={2}>
              <StatCard
                icon="solar:widget-5-bold"
                label={t('policy.stat_total_items')}
                value={totalItems}
              />
            </Grid>
            <Grid xs={6} md={2}>
              <StatCard
                icon="solar:clock-circle-bold"
                label={t('policy.stat_last_updated')}
                value={savedAt ? savedAt.toLocaleTimeString('vi-VN') : '—'}
              />
            </Grid>
          </Grid>

          <Grid container spacing={3}>
            <Grid xs={12} md={6}>
              <Card sx={{ p: 3, borderRadius: 3 }}>
                <Stack spacing={2}>
                  <TextField
                    label={t('policy.banner_eyebrow')}
                    value={banner.eyebrow}
                    onChange={(e) => updateBanner('eyebrow', e.target.value)}
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label={t('policy.banner_title_lines')}
                    helperText={t('policy.banner_title_lines_help')}
                    value={banner.titleLines.join('\n')}
                    onChange={(e) => updateTitleLines(e.target.value)}
                    fullWidth
                    multiline
                    minRows={3}
                  />
                  <TextField
                    label={t('policy.banner_subtitle')}
                    value={banner.subtitle}
                    onChange={(e) => updateBanner('subtitle', e.target.value)}
                    fullWidth
                    multiline
                    minRows={3}
                  />
                  <TextField
                    label={t('policy.banner_version')}
                    value={banner.versionLabel}
                    onChange={(e) => updateBanner('versionLabel', e.target.value)}
                    fullWidth
                    size="small"
                  />
                </Stack>
              </Card>

              <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5 }}>
                {t('policy.highlights_section')}
              </Typography>
              <Stack spacing={1.5}>
                {banner.highlights.map((h, idx) => (
                  <Card key={`${h.label}-${idx}`} sx={{ p: 2, borderRadius: 2.5 }}>
                    <Stack direction="row" spacing={1.5}>
                      <TextField
                        label={t('policy.highlight_icon')}
                        value={h.icon}
                        onChange={(e) => updateHighlight(idx, 'icon', e.target.value)}
                        size="small"
                        sx={{ width: '30%' }}
                      />
                      <TextField
                        label={t('policy.highlight_label')}
                        value={h.label}
                        onChange={(e) => updateHighlight(idx, 'label', e.target.value)}
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label={t('policy.highlight_sub')}
                        value={h.sub}
                        onChange={(e) => updateHighlight(idx, 'sub', e.target.value)}
                        size="small"
                        fullWidth
                      />
                    </Stack>
                  </Card>
                ))}
              </Stack>
            </Grid>

            <Grid xs={12} md={6}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <PreviewFrame>
                <Box sx={{ bgcolor: SPA2_CREAM, py: 5, px: 3 }}>
                  <Typography sx={{ fontSize: 11, color: SPA2_TEAL_DARK, mb: 1 }}>
                    {banner.versionLabel}
                  </Typography>
                  <Typography variant="overline" sx={{ color: SPA2_TEAL, letterSpacing: 3 }}>
                    {banner.eyebrow.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="h4"
                    sx={{ color: SPA2_INK, fontWeight: 600, lineHeight: 1.1, mt: 1 }}
                  >
                    {banner.titleLines.map((line, idx) => (
                      <Box component="span" key={`${line}-${idx}`} sx={{ display: 'block' }}>
                        {line}
                      </Box>
                    ))}
                  </Typography>
                  <Typography sx={{ color: 'text.secondary', mt: 1.5, maxWidth: 400 }}>
                    {banner.subtitle}
                  </Typography>
                  <Grid container spacing={1.5} sx={{ mt: 2 }}>
                    {banner.highlights.map((h, idx) => (
                      <Grid key={`${h.label}-${idx}`} xs={6}>
                        <Spa2SoftCard sx={{ textAlign: 'center', py: 2 }}>
                          <Iconify icon={h.icon} width={24} sx={{ color: SPA2_TEAL, mb: 0.5 }} />
                          <Typography sx={{ fontSize: 12, fontWeight: 600, color: SPA2_INK }}>
                            {h.label}
                          </Typography>
                          <Typography sx={{ fontSize: 10, color: 'text.secondary' }}>
                            {h.sub}
                          </Typography>
                        </Spa2SoftCard>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </PreviewFrame>
            </Grid>
          </Grid>

          <Card>
            <Stack sx={{ p: 2 }}>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                {t('policy.nav_section')}
              </Typography>
              <Alert
                severity="info"
                icon={<Iconify icon="solar:info-circle-bold" />}
                sx={{ borderRadius: 2 }}
              >
                {t('policy.list_note')}
              </Alert>
            </Stack>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell width={40}>{t('faq.col_order')}</TableCell>
                    <TableCell>{t('policy.col_article')}</TableCell>
                    <TableCell>{t('policy.col_label')}</TableCell>
                    <TableCell>{t('policy.col_icon')}</TableCell>
                    <TableCell align="right">{t('common.actions')}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {articles.map((item, index) => (
                    <TableRow key={item.id} hover>
                      <TableCell>
                        <Stack alignItems="center" spacing={0.5}>
                          <IconButton
                            size="small"
                            onClick={() => handleMoveUp(item.id)}
                            disabled={index === 0}
                          >
                            <Iconify icon="eva:arrow-up-fill" width={14} />
                          </IconButton>
                          <Typography variant="caption" color="text.secondary">
                            {index + 1}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleMoveDown(item.id)}
                            disabled={index === articles.length - 1}
                          >
                            <Iconify icon="eva:arrow-down-fill" width={14} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Chip size="small" label={item.article} />
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Iconify icon={item.icon} width={16} sx={{ color: SPA2_TEAL }} />
                          <Typography variant="subtitle2">{item.label}</Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {item.icon}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title={t('common.edit')}>
                          <IconButton size="small" onClick={() => openEdit(item)}>
                            <Iconify icon="solar:pen-bold" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Stack>
      )}

      {/* Per-article content tabs */}
      {articles.map((article) => {
        if (tab !== article.id) return null;
        const data = content[article.id];
        return (
          <Grid key={article.id} container spacing={3}>
            <Grid xs={12} md={7}>
              <Stack spacing={2.5}>
                <Card sx={{ p: 3, borderRadius: 3 }}>
                  <TextField
                    label={t('policy.content_title')}
                    value={data.title}
                    onChange={(e) => updateTitle(article.id, e.target.value)}
                    fullWidth
                  />
                </Card>

                {data.cards && (
                  <Card sx={{ p: 2.5, borderRadius: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      {t('policy.cards_section')}
                    </Typography>
                    <Stack spacing={1.5}>
                      {data.cards.map((c, idx) => (
                        <Card key={idx} sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                          <Stack spacing={1.5}>
                            <Stack direction="row" spacing={1.5}>
                              <TextField
                                label={t('policy.card_icon')}
                                value={c.icon}
                                onChange={(e) =>
                                  updateCard(article.id, idx, 'icon', e.target.value)
                                }
                                size="small"
                                sx={{ width: '35%' }}
                              />
                              <TextField
                                label={t('policy.card_title')}
                                value={c.title}
                                onChange={(e) =>
                                  updateCard(article.id, idx, 'title', e.target.value)
                                }
                                size="small"
                                fullWidth
                              />
                              <Tooltip title={t('common.delete')}>
                                <IconButton
                                  size="small"
                                  onClick={() => removeCard(article.id, idx)}
                                >
                                  <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                            <TextField
                              label={t('policy.card_desc')}
                              value={c.desc}
                              onChange={(e) => updateCard(article.id, idx, 'desc', e.target.value)}
                              size="small"
                              fullWidth
                              multiline
                              minRows={2}
                            />
                          </Stack>
                        </Card>
                      ))}
                      <Button
                        size="small"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => addCard(article.id)}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        {t('policy.add_card')}
                      </Button>
                    </Stack>
                  </Card>
                )}

                {data.tableRows && (
                  <Card sx={{ p: 2.5, borderRadius: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      {t('policy.table_section')}
                    </Typography>
                    <Stack spacing={1.5}>
                      {data.tableRows.map((row, idx) => (
                        <Card key={idx} sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                          <Stack spacing={1.5}>
                            <Stack direction="row" spacing={1.5}>
                              <TextField
                                label={t('policy.col_time')}
                                value={row.time}
                                onChange={(e) =>
                                  updateTableRow(article.id, idx, 'time', e.target.value)
                                }
                                size="small"
                                fullWidth
                              />
                              <TextField
                                label={t('policy.col_fee')}
                                value={row.fee}
                                onChange={(e) =>
                                  updateTableRow(article.id, idx, 'fee', e.target.value)
                                }
                                size="small"
                                fullWidth
                              />
                            </Stack>
                            <Stack direction="row" spacing={1.5}>
                              <TextField
                                label={t('policy.col_refund')}
                                value={row.refund}
                                onChange={(e) =>
                                  updateTableRow(article.id, idx, 'refund', e.target.value)
                                }
                                size="small"
                                fullWidth
                              />
                              <TextField
                                label={t('policy.col_change')}
                                value={row.change}
                                onChange={(e) =>
                                  updateTableRow(article.id, idx, 'change', e.target.value)
                                }
                                size="small"
                                fullWidth
                              />
                              <Tooltip title={t('common.delete')}>
                                <IconButton
                                  size="small"
                                  onClick={() => removeTableRow(article.id, idx)}
                                >
                                  <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                          </Stack>
                        </Card>
                      ))}
                      <Button
                        size="small"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => addTableRow(article.id)}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        {t('policy.add_row')}
                      </Button>
                    </Stack>
                  </Card>
                )}

                {data.timelineSteps && (
                  <Card sx={{ p: 2.5, borderRadius: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      {t('policy.timeline_section')}
                    </Typography>
                    <Stack spacing={1.5}>
                      {data.timelineSteps.map((s, idx) => (
                        <Card key={idx} sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                          <Stack spacing={1.5}>
                            <Stack direction="row" spacing={1.5}>
                              <TextField
                                label={t('policy.step_title')}
                                value={s.title}
                                onChange={(e) =>
                                  updateTimelineStep(article.id, idx, 'title', e.target.value)
                                }
                                size="small"
                                fullWidth
                              />
                              <Tooltip title={t('common.delete')}>
                                <IconButton
                                  size="small"
                                  onClick={() => removeTimelineStep(article.id, idx)}
                                >
                                  <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                            <TextField
                              label={t('policy.step_desc')}
                              value={s.desc}
                              onChange={(e) =>
                                updateTimelineStep(article.id, idx, 'desc', e.target.value)
                              }
                              size="small"
                              fullWidth
                              multiline
                              minRows={2}
                            />
                          </Stack>
                        </Card>
                      ))}
                      <Button
                        size="small"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => addTimelineStep(article.id)}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        {t('policy.add_step')}
                      </Button>
                    </Stack>
                  </Card>
                )}

                {data.tiers && (
                  <Card sx={{ p: 2.5, borderRadius: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      {t('policy.tiers_section')}
                    </Typography>
                    <Stack spacing={1.5}>
                      {data.tiers.map((tier, idx) => (
                        <Card key={idx} sx={{ p: 2, borderRadius: 2, bgcolor: SPA2_CREAM }}>
                          <Stack spacing={1.5}>
                            <Stack direction="row" spacing={1.5}>
                              <TextField
                                label={t('policy.tier_label')}
                                value={tier.label}
                                onChange={(e) =>
                                  updateTier(article.id, idx, 'label', e.target.value)
                                }
                                size="small"
                                fullWidth
                              />
                              <TextField
                                label={t('policy.tier_color')}
                                value={tier.color}
                                onChange={(e) =>
                                  updateTier(article.id, idx, 'color', e.target.value)
                                }
                                size="small"
                                sx={{ width: '25%' }}
                              />
                              <TextField
                                label={t('policy.tier_text_color')}
                                value={tier.textColor}
                                onChange={(e) =>
                                  updateTier(article.id, idx, 'textColor', e.target.value)
                                }
                                size="small"
                                sx={{ width: '25%' }}
                              />
                              <Tooltip title={t('common.delete')}>
                                <IconButton
                                  size="small"
                                  onClick={() => removeTier(article.id, idx)}
                                >
                                  <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                                </IconButton>
                              </Tooltip>
                            </Stack>
                            <Stack spacing={1}>
                              <Typography variant="caption" color="text.secondary">
                                {t('policy.tier_perks')}
                              </Typography>
                              {tier.perks.map((perk, perkIdx) => (
                                <Stack
                                  key={perkIdx}
                                  direction="row"
                                  spacing={1}
                                  alignItems="center"
                                >
                                  <Iconify
                                    icon="solar:check-circle-bold"
                                    width={16}
                                    sx={{ color: SPA2_TEAL, flexShrink: 0 }}
                                  />
                                  <TextField
                                    value={perk}
                                    onChange={(e) =>
                                      updateTierPerk(article.id, idx, perkIdx, e.target.value)
                                    }
                                    size="small"
                                    fullWidth
                                  />
                                  <IconButton
                                    size="small"
                                    onClick={() => removeTierPerk(article.id, idx, perkIdx)}
                                  >
                                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                                  </IconButton>
                                </Stack>
                              ))}
                              <Button
                                size="small"
                                startIcon={<Iconify icon="mingcute:add-line" />}
                                onClick={() => addTierPerk(article.id, idx)}
                                sx={{ alignSelf: 'flex-start' }}
                              >
                                {t('policy.add_perk')}
                              </Button>
                            </Stack>
                          </Stack>
                        </Card>
                      ))}
                      <Button
                        size="small"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => addTier(article.id)}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        {t('policy.add_tier')}
                      </Button>
                    </Stack>
                  </Card>
                )}

                {data.listItems && (
                  <Card sx={{ p: 2.5, borderRadius: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      {t('policy.list_items_section')}
                    </Typography>
                    <Stack spacing={1.5}>
                      {data.listItems.map((item, idx) => (
                        <Stack key={idx} direction="row" spacing={1} alignItems="flex-start">
                          <Iconify
                            icon="solar:check-circle-bold"
                            width={16}
                            sx={{ color: SPA2_TEAL, flexShrink: 0, mt: 1 }}
                          />
                          <TextField
                            value={item}
                            onChange={(e) => updateListItem(article.id, idx, e.target.value)}
                            size="small"
                            fullWidth
                            multiline
                          />
                          <IconButton size="small" onClick={() => removeListItem(article.id, idx)}>
                            <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                          </IconButton>
                        </Stack>
                      ))}
                      <Button
                        size="small"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => addListItem(article.id)}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        {t('policy.add_list_item')}
                      </Button>
                    </Stack>
                  </Card>
                )}

                {data.certChips && (
                  <Card sx={{ p: 2.5, borderRadius: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      {t('policy.certs_section')}
                    </Typography>
                    <Stack spacing={1.5}>
                      {data.certChips.map((c, idx) => (
                        <Stack key={idx} direction="row" spacing={1.5}>
                          <TextField
                            label={t('policy.cert_label')}
                            value={c.label}
                            onChange={(e) =>
                              updateCertChip(article.id, idx, 'label', e.target.value)
                            }
                            size="small"
                            fullWidth
                          />
                          <TextField
                            label={t('policy.cert_icon')}
                            value={c.icon}
                            onChange={(e) =>
                              updateCertChip(article.id, idx, 'icon', e.target.value)
                            }
                            size="small"
                            fullWidth
                          />
                          <Tooltip title={t('common.delete')}>
                            <IconButton
                              size="small"
                              onClick={() => removeCertChip(article.id, idx)}
                            >
                              <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      ))}
                      <Button
                        size="small"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={() => addCertChip(article.id)}
                        sx={{ alignSelf: 'flex-start' }}
                      >
                        {t('policy.add_cert')}
                      </Button>
                    </Stack>
                  </Card>
                )}

                {data.alert && (
                  <Card sx={{ p: 2.5, borderRadius: 3 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      {t('policy.alert_section')}
                    </Typography>
                    <Stack spacing={1.5}>
                      <TextField
                        select
                        label={t('policy.alert_severity')}
                        value={data.alert.severity}
                        onChange={(e) =>
                          updateAlertSeverity(
                            article.id,
                            e.target.value as Spa2PolicyAlert['severity']
                          )
                        }
                        size="small"
                        fullWidth
                      >
                        <MenuItem value="info">Info</MenuItem>
                        <MenuItem value="success">Success</MenuItem>
                        <MenuItem value="warning">Warning</MenuItem>
                      </TextField>
                      <TextField
                        label={t('policy.alert_text')}
                        value={data.alert.text}
                        onChange={(e) => updateAlertText(article.id, e.target.value)}
                        fullWidth
                        multiline
                        minRows={2}
                      />
                    </Stack>
                  </Card>
                )}
              </Stack>
            </Grid>

            <Grid xs={12} md={5}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <PreviewFrame>
                <Box sx={{ bgcolor: 'common.white', p: 3 }}>
                  <ArticleBody
                    article={article}
                    data={data}
                    privacyAgreed={previewPrivacyAgreed}
                    onPrivacyChange={setPreviewPrivacyAgreed}
                  />
                </Box>
              </PreviewFrame>
            </Grid>
          </Grid>
        );
      })}

      {/* Live preview — renders the exact same Spa2PolicyPageView component as the public route,
          fed by the in-progress banner/articles/content state, so both are always in parity. */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2PolicyPageView banner={banner} articles={articles} content={content} />
        </Box>
      )}

      {/* Edit dialog for nav label/icon/article number - left: form, right: live preview */}
      <Dialog open={!!editId} onClose={() => setEditId(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('policy.form_edit')}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={3} sx={{ pt: 1 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <TextField
                  label={t('policy.col_article')}
                  value={form.article}
                  onChange={(e) => setForm((p) => ({ ...p, article: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('policy.col_label')}
                  value={form.label}
                  onChange={(e) => setForm((p) => ({ ...p, label: e.target.value }))}
                  fullWidth
                />
                <TextField
                  label={t('policy.col_icon')}
                  value={form.icon}
                  onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                  fullWidth
                  placeholder="solar:calendar-bold"
                />
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography
                variant="caption"
                sx={{ color: 'text.secondary', mb: 1, display: 'block' }}
              >
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <Stack spacing={1.5}>
                  <Chip
                    size="small"
                    label={form.article || 'Điều —'}
                    sx={{ width: 'fit-content' }}
                  />
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{
                      bgcolor: 'common.white',
                      borderRadius: 99,
                      px: 2,
                      py: 1,
                      width: 'fit-content',
                      border: `1.5px solid ${SPA2_TEAL}`,
                    }}
                  >
                    <Iconify
                      icon={form.icon || 'solar:calendar-bold'}
                      width={16}
                      sx={{ color: SPA2_TEAL }}
                    />
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: SPA2_TEAL_DARK }}>
                      {form.label || '(Chưa đặt tên)'}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditId(null)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {t('policy.form_edit')}
          </Button>
        </DialogActions>
      </Dialog>
    </Spa2ManageShell>
  );
}
