# Stripe Setup Guide

## 1. Create Stripe Account

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Sign up for free account
3. Complete business verification

## 2. Get API Keys

### Test Mode Keys (for development)
1. Go to **Developers > API keys**
2. Copy **Publishable key** → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
3. Copy **Secret key** → `STRIPE_SECRET_KEY`

### Live Mode Keys (for production)
1. Click **"Go live"** in dashboard
2. Complete Stripe identity verification
3. Get live API keys

## 3. Setup Webhook

1. Go to **Developers > Webhooks**
2. Click **"Add endpoint"**
3. Add endpoint URL:
   ```
   https://your-domain.com/api/payments/webhook
   ```
4. Select events:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `charge.refunded`
5. Copy webhook signing secret → `STRIPE_WEBHOOK_SECRET`

## 4. Environment Variables

Add to `.env`:
```env
STRIPE_SECRET_KEY=sk_live_xxxxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
```

## 5. Test Webhook Locally

Use Stripe CLI:
```bash
# Install CLI
curl -sL https://stripe.com/install | sh

# Login
stripe login

# Forward events to localhost
stripe listen --forward-to localhost:3001/api/payments/webhook
```

## 6. Test Payments

Use Stripe test cards:
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- 3D Secure: `4000 0025 0000 3155`

Any future expiry date, any CVC.

## Stripe Dashboard

- **Payments**: View all transactions
- **Balance**: See available funds
- **Customers**: View customer data
- **Disputes**: Handle chargebacks
- **Settings**: Configure payouts, invoices
