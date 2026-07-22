import type { ReactNode } from 'react';

import { useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { paths } from 'src/routes/paths';

import { uuidv4 } from 'src/utils/uuidv4';
import { fCurrency } from 'src/utils/format-number';

import { useTranslate } from 'src/locales';
import { bgBlur, varAlpha } from 'src/theme/styles';
import {
  spa2ShopBanner,
  spa2ShopProducts,
  spa2ShopCategories,
  type Spa2ShopProduct,
  type Spa2ShopCategory,
  type Spa2AdjustableImage,
} from 'src/_mock/_spa2';

import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';

import { Spa2SoftCard } from 'src/sections/spa2/view/spa2-content-pages';
import { Spa2ContentPageHero, Spa2ShopPageView } from 'src/sections/spa2/view/spa2-content-pages2';
import {
  SPA2_TEAL,
  SPA2_CREAM,
  SPA2_TEAL_DARK,
  SPA2_CREAM_DARK,
} from 'src/sections/spa2/spa2-pages-data';

import { Spa2ImageField } from './spa2-image-field';
import { Spa2ManageShell } from './spa2-manage-shell';
import { Spa2SimpleImageField } from './spa2-simple-image-field';

// -----------------------------------------------------------------------------
// Manages every block src/sections/spa2/view/spa2-content-pages2.tsx's
// Spa2ShopPageView renders on the public /spa2/shop page: the page banner,
// the category filter chips and the product catalog - read from and written
// back in the same shape as src/_mock/_spa2, the single source of truth
// shared with the public view. The "banner" tab reuses Spa2ContentPageHero
// and the "preview" tab reuses Spa2ShopPageView itself, fed with the
// in-progress edited state.
// -----------------------------------------------------------------------------

const withId = <T extends object>(item: T): T & { id: string } => ({ id: uuidv4(), ...item });

const formatVND = (n: number) => `${fCurrency(n)} VND`;

const EMPTY_PRODUCT_FORM = {
  name: '',
  price: 0,
  rating: 5,
  reviews: 0,
  image: '',
  tag: '',
  category: 'skincare',
};

function SectionCard({
  title,
  icon,
  action,
  children,
}: {
  title: string;
  icon: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <Card sx={{ p: 3, borderRadius: 3, height: '100%' }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon={icon} width={22} sx={{ color: SPA2_TEAL }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {title}
          </Typography>
        </Stack>
        {action}
      </Stack>
      <Divider sx={{ mb: 2 }} />
      {children}
    </Card>
  );
}

function PreviewFrame({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        border: `1px solid ${SPA2_CREAM_DARK}`,
        transform: 'scale(0.82)',
        transformOrigin: 'top left',
        width: '122%',
      }}
    >
      {children}
    </Box>
  );
}

function ProductPreviewCard({
  name,
  price,
  rating,
  reviews,
  image,
  tag,
}: {
  name: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tag: string;
}) {
  return (
    <Spa2SoftCard sx={{ p: 0, overflow: 'hidden' }}>
      <Box sx={{ position: 'relative' }}>
        <Box
          sx={{
            height: 140,
            bgcolor: SPA2_CREAM,
            backgroundImage: image ? `url(${image})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {tag && (
          <Chip
            label={tag}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              bgcolor: SPA2_TEAL,
              color: 'white',
              fontWeight: 700,
            }}
          />
        )}
      </Box>
      <Box sx={{ p: 1.5 }}>
        <Typography sx={{ fontWeight: 600, fontSize: 13, mb: 0.5 }}>
          {name || 'Tên sản phẩm'}
        </Typography>
        <Stack direction="row" alignItems="center" spacing={0.5} sx={{ mb: 1 }}>
          <Rating value={rating} readOnly size="small" precision={0.1} sx={{ fontSize: 13 }} />
          <Typography sx={{ fontSize: 11, color: 'text.secondary' }}>({reviews})</Typography>
        </Stack>
        <Typography sx={{ fontWeight: 700, color: SPA2_TEAL, fontSize: 14 }}>
          {formatVND(price)}
        </Typography>
      </Box>
    </Spa2SoftCard>
  );
}

export function Spa2ShopManageView() {
  const theme = useTheme();
  const { t } = useTranslate('spa2-manage');

  const [banner, setBanner] = useState(() => ({
    ...spa2ShopBanner,
    image: { ...spa2ShopBanner.image },
  }));
  const [dirty, setDirty] = useState(false);
  const [savedAt, setSavedAt] = useState<Date | null>(null);
  const [tab, setTab] = useState<'banner' | 'categories' | 'products' | 'preview'>('banner');
  const markDirty = () => setDirty(true);

  // ---- Banner ----
  const updateBanner = (key: 'eyebrow' | 'title' | 'subtitle', value: string) => {
    setBanner((prev) => ({ ...prev, [key]: value }));
    markDirty();
  };
  const updateBannerImage = (img: Spa2AdjustableImage) => {
    setBanner((prev) => ({ ...prev, image: img }));
    markDirty();
  };

  // ---- Categories ----
  const [categories, setCategories] = useState<Spa2ShopCategory[]>(() =>
    spa2ShopCategories.map((c) => ({ ...c }))
  );
  const realCategories = useMemo(() => categories.filter((c) => c.value !== 'all'), [categories]);

  const updateCategory = (idx: number, patch: Partial<Spa2ShopCategory>) => {
    setCategories((prev) => prev.map((c, i) => (i === idx ? { ...c, ...patch } : c)));
    markDirty();
  };
  const addCategory = () => {
    setCategories((prev) => [...prev, { value: `cat-${prev.length}`, label: '' }]);
    markDirty();
  };
  const removeCategory = (idx: number) => {
    setCategories((prev) => prev.filter((_, i) => i !== idx));
    markDirty();
  };

  // ---- Products ----
  const [products, setProducts] = useState<Spa2ShopProduct[]>(() =>
    spa2ShopProducts.map((p) => ({ ...p }))
  );
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT_FORM);
  const [productDialog, setProductDialog] = useState(false);
  const [productEditId, setProductEditId] = useState<string | null>(null);
  const [productDeleteId, setProductDeleteId] = useState<string | null>(null);
  const [productFilter, setProductFilter] = useState('all');

  const filteredProducts = useMemo(
    () =>
      productFilter === 'all' ? products : products.filter((p) => p.category === productFilter),
    [products, productFilter]
  );

  const openCreateProduct = () => {
    setProductForm({ ...EMPTY_PRODUCT_FORM, category: realCategories[0]?.value ?? 'skincare' });
    setProductEditId(null);
    setProductDialog(true);
  };
  const openEditProduct = (item: Spa2ShopProduct) => {
    setProductForm({
      name: item.name,
      price: item.price,
      rating: item.rating,
      reviews: item.reviews,
      image: item.image,
      tag: item.tag,
      category: item.category,
    });
    setProductEditId(item.id);
    setProductDialog(true);
  };
  const submitProduct = () => {
    const next = { ...productForm };
    if (productEditId) {
      setProducts((prev) => prev.map((p) => (p.id === productEditId ? { ...p, ...next } : p)));
    } else {
      setProducts((prev) => [...prev, withId(next)]);
    }
    setProductDialog(false);
    markDirty();
  };
  const confirmDeleteProduct = () => {
    setProducts((prev) => prev.filter((p) => p.id !== productDeleteId));
    setProductDeleteId(null);
    markDirty();
  };

  const handleSave = () => {
    setSavedAt(new Date());
    setDirty(false);
  };

  const handleReset = () => {
    setBanner({ ...spa2ShopBanner, image: { ...spa2ShopBanner.image } });
    setCategories(spa2ShopCategories.map((c) => ({ ...c })));
    setProducts(spa2ShopProducts.map((p) => ({ ...p })));
    setDirty(false);
  };

  return (
    <Spa2ManageShell
      title={t('shop.page_title')}
      description={banner.subtitle}
      breadcrumbLabel={t('nav.shop')}
      publicPath={paths.spa2.shop}
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
        onChange={(_, v) => setTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          position: 'sticky',
          top: 64,
          zIndex: 10,
          ...bgBlur({ color: varAlpha(theme.vars.palette.background.defaultChannel, 0.8) }),
        }}
      >
        <Tab
          value="banner"
          label={t('shop.banner_section')}
          icon={<Iconify icon="solar:gallery-wide-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="categories"
          label={t('shop.categories_section')}
          icon={<Iconify icon="solar:tag-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="products"
          label={t('shop.products_section')}
          icon={<Iconify icon="solar:bag-4-bold-duotone" width={20} />}
          iconPosition="start"
        />
        <Tab
          value="preview"
          label={t('common.preview_btn')}
          icon={<Iconify icon="solar:eye-bold-duotone" width={20} />}
          iconPosition="start"
        />
      </Tabs>

      {/* Banner */}
      {tab === 'banner' && (
        <Grid container spacing={3}>
          <Grid xs={12} md={6}>
            <SectionCard title={t('shop.banner_section')} icon="solar:gallery-wide-bold-duotone">
              <Stack spacing={2}>
                <Spa2ImageField
                  label={t('shop.banner_image')}
                  value={banner.image}
                  onChange={updateBannerImage}
                  height={200}
                  helperText={t('shop.banner_image_help')}
                />
                <TextField
                  label={t('shop.banner_eyebrow')}
                  value={banner.eyebrow}
                  onChange={(e) => updateBanner('eyebrow', e.target.value)}
                  fullWidth
                  size="small"
                />
                <TextField
                  label={t('shop.banner_title')}
                  value={banner.title}
                  onChange={(e) => updateBanner('title', e.target.value)}
                  fullWidth
                  multiline
                  minRows={2}
                />
                <TextField
                  label={t('shop.banner_subtitle')}
                  value={banner.subtitle}
                  onChange={(e) => updateBanner('subtitle', e.target.value)}
                  fullWidth
                  multiline
                  minRows={3}
                />
              </Stack>
            </SectionCard>
          </Grid>
          <Grid xs={12} md={6}>
            <SectionCard title={t('common.preview_btn')} icon="solar:eye-bold-duotone">
              <PreviewFrame>
                <Spa2ContentPageHero
                  img={banner.image.url}
                  imageStyle={banner.image}
                  eyebrow={banner.eyebrow}
                  title={banner.title}
                  subtitle={banner.subtitle}
                />
              </PreviewFrame>
            </SectionCard>
          </Grid>
        </Grid>
      )}

      {/* Categories */}
      {tab === 'categories' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('shop.categories_section')}
            </Typography>
            <Button
              size="small"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={addCategory}
            >
              {t('shop.add_category_btn')}
            </Button>
          </Stack>
          <Stack spacing={1.5}>
            {categories.map((c, idx) => (
              <Stack key={c.value} direction="row" spacing={1.5} alignItems="center">
                <Chip
                  size="small"
                  label={c.value === 'all' ? t('shop.category_all_locked') : c.value}
                  sx={{ bgcolor: SPA2_CREAM, minWidth: 100 }}
                />
                <TextField
                  size="small"
                  fullWidth
                  label={t('shop.form_category_label')}
                  value={c.label}
                  onChange={(e) => updateCategory(idx, { label: e.target.value })}
                />
                {c.value !== 'all' && (
                  <IconButton size="small" color="error" onClick={() => removeCategory(idx)}>
                    <Iconify icon="solar:trash-bin-trash-bold" width={16} />
                  </IconButton>
                )}
              </Stack>
            ))}
          </Stack>
        </Card>
      )}

      {/* Products */}
      {tab === 'products' && (
        <Card sx={{ p: 3, borderRadius: 3 }}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ mb: 2 }}
            flexWrap="wrap"
            useFlexGap
            gap={1}
          >
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {t('shop.products_section')}
            </Typography>
            <Stack direction="row" spacing={1.5} alignItems="center">
              <TextField
                select
                size="small"
                value={productFilter}
                onChange={(e) => setProductFilter(e.target.value)}
                sx={{ minWidth: 160 }}
              >
                {categories.map((c) => (
                  <MenuItem key={c.value} value={c.value}>
                    {c.label}
                  </MenuItem>
                ))}
              </TextField>
              <Button
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={openCreateProduct}
                sx={{
                  bgcolor: SPA2_TEAL,
                  '&:hover': { bgcolor: SPA2_TEAL_DARK },
                  borderRadius: 999,
                  px: 3,
                }}
              >
                {t('shop.add_product_btn')}
              </Button>
            </Stack>
          </Stack>
          <Grid container spacing={2}>
            {filteredProducts.map((item) => (
              <Grid key={item.id} xs={12} sm={6} md={3}>
                <Box sx={{ position: 'relative' }}>
                  <ProductPreviewCard {...item} />
                  <Stack
                    direction="row"
                    spacing={0.5}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => openEditProduct(item)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:pen-bold" width={14} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => setProductDeleteId(item.id)}
                      sx={{ bgcolor: 'common.white', boxShadow: 1 }}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" width={14} />
                    </IconButton>
                  </Stack>
                </Box>
              </Grid>
            ))}
            {filteredProducts.length === 0 && (
              <Grid xs={12}>
                <Typography
                  variant="body2"
                  color="text.disabled"
                  sx={{ py: 3, textAlign: 'center' }}
                >
                  {t('shop.no_products')}
                </Typography>
              </Grid>
            )}
          </Grid>
        </Card>
      )}

      {/* Full page preview */}
      {tab === 'preview' && (
        <Box sx={{ bgcolor: 'background.default', borderRadius: 3, overflow: 'hidden' }}>
          <Spa2ShopPageView banner={banner} categories={categories} products={products} />
        </Box>
      )}

      {/* Product add/edit dialog */}
      <Dialog open={productDialog} onClose={() => setProductDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{productEditId ? t('common.edit') : t('shop.add_product_btn')}</DialogTitle>
        <DialogContent>
          <Grid container spacing={3} sx={{ mt: 0.5 }}>
            <Grid xs={12} sm={7}>
              <Stack spacing={2}>
                <Spa2SimpleImageField
                  label={t('shop.form_product_image')}
                  value={productForm.image}
                  onChange={(url) => setProductForm((p) => ({ ...p, image: url }))}
                  height={140}
                />
                <TextField
                  label={t('shop.form_product_name')}
                  fullWidth
                  size="small"
                  value={productForm.name}
                  onChange={(e) => setProductForm((p) => ({ ...p, name: e.target.value }))}
                />
                <TextField
                  select
                  label={t('shop.form_product_category')}
                  fullWidth
                  size="small"
                  value={productForm.category}
                  onChange={(e) => setProductForm((p) => ({ ...p, category: e.target.value }))}
                >
                  {realCategories.map((c) => (
                    <MenuItem key={c.value} value={c.value}>
                      {c.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('common.price_vnd')}
                    type="number"
                    size="small"
                    value={productForm.price}
                    onChange={(e) =>
                      setProductForm((p) => ({ ...p, price: Number(e.target.value) }))
                    }
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('shop.form_product_tag')}
                    size="small"
                    value={productForm.tag}
                    onChange={(e) => setProductForm((p) => ({ ...p, tag: e.target.value }))}
                    sx={{ flex: 1 }}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label={t('shop.form_product_rating')}
                    type="number"
                    size="small"
                    inputProps={{ step: 0.1, min: 0, max: 5 }}
                    value={productForm.rating}
                    onChange={(e) =>
                      setProductForm((p) => ({ ...p, rating: Number(e.target.value) }))
                    }
                    sx={{ flex: 1 }}
                  />
                  <TextField
                    label={t('shop.form_product_reviews')}
                    type="number"
                    size="small"
                    value={productForm.reviews}
                    onChange={(e) =>
                      setProductForm((p) => ({ ...p, reviews: Number(e.target.value) }))
                    }
                    sx={{ flex: 1 }}
                  />
                </Stack>
              </Stack>
            </Grid>
            <Grid xs={12} sm={5}>
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
                {t('common.preview_btn')}
              </Typography>
              <Box sx={{ bgcolor: SPA2_CREAM, borderRadius: 3, p: 2 }}>
                <ProductPreviewCard {...productForm} />
              </Box>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setProductDialog(false)}>{t('common.cancel')}</Button>
          <Button
            variant="contained"
            onClick={submitProduct}
            sx={{ bgcolor: SPA2_TEAL, '&:hover': { bgcolor: SPA2_TEAL_DARK } }}
          >
            {productEditId ? t('common.update') : t('common.create')}
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={!!productDeleteId}
        onClose={() => setProductDeleteId(null)}
        title={t('common.delete')}
        content={t('common.confirm_delete')}
        action={
          <Button variant="contained" color="error" onClick={confirmDeleteProduct}>
            {t('common.yes_delete')}
          </Button>
        }
      />
    </Spa2ManageShell>
  );
}
