# VNPay Local Run

## 1. Copy local env templates if needed

```powershell
Copy-Item apps\api\.env.vnpay.example apps\api\.env
Copy-Item apps\user\.env.vnpay.example apps\user\.env
```

Then fill:

- `API_PUBLIC_URL`
- `VNPAY_TMN_CODE`
- `VNPAY_HASH_SECRET`

## 2. Check env

```powershell
npm run check:vnpay-env
```

## 3. Seed demo data

```powershell
npm run seed:demo
```

## 4. Start local apps

```powershell
npm run dev:checkout
```

If you also want admin:

```powershell
npm run dev
```

## 5. Create public HTTPS tunnel for the API

Example:

```powershell
ngrok http 4000
```

or

```powershell
cloudflared tunnel --url http://localhost:4000
```

Update `API_PUBLIC_URL` to the public HTTPS URL, then restart the API.

## 6. Test flow

1. Sign in with the seeded customer
2. Add product to cart
3. Go to checkout
4. Choose `VNPay`
5. Pay on the VNPay sandbox page
6. Confirm that `/checkout/payment/result` shows success
7. Confirm profile/admin pages show the updated order state
