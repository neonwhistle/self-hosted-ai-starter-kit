-- Create tables for form submissions
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID PRIMARY KEY,
  form_type TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  spam_score INTEGER DEFAULT 0,
  spam_reasons JSONB,
  is_spam BOOLEAN DEFAULT FALSE,
  processed BOOLEAN DEFAULT FALSE,
  processed_at TIMESTAMPTZ,
  processing_notes TEXT,
  n8n_status TEXT,
  n8n_error TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for webhook logs
CREATE TABLE IF NOT EXISTS public.webhook_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  source TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB,
  status TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create table for IP denylist
CREATE TABLE IF NOT EXISTS public.ip_denylist (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  ip TEXT NOT NULL UNIQUE,
  reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies
-- Enable RLS on tables
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ip_denylist ENABLE ROW LEVEL SECURITY;

-- Create policies for form_submissions
CREATE POLICY "Allow service role full access to form_submissions"
  ON public.form_submissions
  USING (true)
  WITH CHECK (true);

-- Create policies for webhook_logs
CREATE POLICY "Allow service role full access to webhook_logs"
  ON public.webhook_logs
  USING (true)
  WITH CHECK (true);

-- Create policies for ip_denylist
CREATE POLICY "Allow service role full access to ip_denylist"
  ON public.ip_denylist
  USING (true)
  WITH CHECK (true);

-- Create functions and triggers
-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for form_submissions
CREATE TRIGGER update_form_submissions_updated_at
BEFORE UPDATE ON public.form_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_form_submissions_is_spam ON public.form_submissions(is_spam);
CREATE INDEX IF NOT EXISTS idx_form_submissions_processed ON public.form_submissions(processed);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form_type ON public.form_submissions(form_type);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON public.form_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_ip_denylist_ip ON public.ip_denylist(ip);
