# Required Image URLs

Tat ca anh moi can duoc dat trong:

- `/assets/images/<filename>`
- thu muc vat ly: `shared/assets/images/`

## 1. Dynamic product image filenames from `seed-products.js`

Day la cac filename se duoc tao tu ten san pham seed hien tai:

- `/assets/images/macbook-air-13-inch.png`
- `/assets/images/macbook-air-15-inch.png`
- `/assets/images/macbook-pro-14-inch.png`
- `/assets/images/macbook-pro-16-inch.png`
- `/assets/images/imac.png`
- `/assets/images/mac-mini.png`
- `/assets/images/mac-studio.png`
- `/assets/images/iphone-17.png`
- `/assets/images/iphone-17e.png`
- `/assets/images/iphone-17-pro.png`
- `/assets/images/iphone-17-promax.png`
- `/assets/images/iphone-16.png`
- `/assets/images/ipad-pro-11-inch.png`
- `/assets/images/ipad-pro-13-inch.png`
- `/assets/images/ipad-air-11-inch.png`
- `/assets/images/ipad-air-13-inch.png`
- `/assets/images/ipad-a16.png`
- `/assets/images/ipad-mini.png`
- `/assets/images/apple-watch-series-11.png`
- `/assets/images/apple-watch-se.png`
- `/assets/images/apple-watch-ultra-3.png`
- `/assets/images/apple-vision-pro.png`
- `/assets/images/airpods-4.png`
- `/assets/images/airpods-pro-3.png`
- `/assets/images/airpods-max.png`

## 1a. Alias mappings currently reusing existing files

- `iphone-16-plus` -> `/assets/images/iphone-16.png`
- `airpods-4-active-noise-cancellation` -> `/assets/images/airpods-4.png`

## 2. Category cover images currently used by `seed-categories.js`

- `/assets/images/macbook-pro-16-inch.png`
- `/assets/images/iphone-17-promax.png`
- `/assets/images/ipad-pro-13-inch.png`
- `/assets/images/apple-watch-ultra-3.png`
- `/assets/images/apple-vision-pro.png`
- `/assets/images/airpods-pro-3.png`

## 3. Hardcoded storefront/editorial image filenames still referenced directly

### Home

- `/assets/images/product-group.png`
- `/assets/images/iphone-17-promax.png`
- `/assets/images/airpods-pro-3.png`
- `/assets/images/macbook-pro-14-inch.png`
- `/assets/images/airpods-max.png`
- `/assets/images/apple-watch-ultra-3.png`
- `/assets/images/ipad-pro-13-inch.png`
- `/assets/images/apple-vision-pro.png`

### About / Blog / Legacy editorial content

- `/assets/images/macbook-air-main.png`
- `/assets/images/iphone-14-front.png`
- `/assets/images/airpods-max-silver.png`
- `/assets/images/ipad-10-9-wifi.png`
- `/assets/images/apple-watch.png`
- `/assets/images/apple-iphone-17-pro-max-main.jpg`

### Generic fallbacks in cards

- `/assets/images/apple-iphone-17-main.jpg`

### Product detail gallery / reviews

- `/assets/images/profile-image-41.png`
- `/assets/images/profile-group-1.png`
- `/assets/images/profile-image-64.png`

## 4. Notes

- Neu ban muon clean hoan toan catalog Apple-only, phan `About/Blog/Legacy editorial content` nen duoc doi sang bo filename moi thay vi tiep tuc giu cac ten cu.
- Hien tai toan bo anh cu da bi xoa khoi `shared/assets/images`.
- Thu muc anh duoc giu lai bang file `.gitkeep`.
