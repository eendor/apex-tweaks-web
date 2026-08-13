CREATE TABLE IF NOT EXISTS support_requests (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(254) NOT NULL,
  topic VARCHAR(50) NOT NULL DEFAULT 'Other',
  message TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS support_requests_created_at_idx ON support_requests(created_at DESC);

CREATE TABLE IF NOT EXISTS stripe_customers (
  id BIGSERIAL PRIMARY KEY,
  email VARCHAR(254) UNIQUE NOT NULL,
  stripe_customer_id VARCHAR(255) UNIQUE NOT NULL,
  subscription_status VARCHAR(32) NOT NULL DEFAULT 'inactive',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stripe_events (
  event_id VARCHAR(255) PRIMARY KEY,
  event_type VARCHAR(100) NOT NULL,
  processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
