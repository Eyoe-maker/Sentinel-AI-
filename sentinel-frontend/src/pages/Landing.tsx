import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Shield,
  Zap,
  BarChart3,
  Globe2,
  Bell,
  FileCheck,
  ChevronRight,
} from 'lucide-react';

export default function Landing() {
  const [email, setEmail] = useState('');

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Sentinel</span>
            </Link>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Products</a>
              <a href="#solutions" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Solutions</a>
              <a href="#pricing" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
              <a href="#docs" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Docs</a>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/sign-in" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
              Sign in
            </Link>
            <Link
              to="/sign-up"
              className="text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-full transition-colors"
            >
              Start now <ChevronRight className="inline w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-50 via-white to-indigo-50" />

        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-violet-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" />
        <div className="absolute top-40 right-1/4 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center space-x-2 bg-violet-50 border border-violet-100 text-violet-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8">
                <Zap className="w-4 h-4" />
                <span>Now supporting the 2025 EU SME VAT Scheme</span>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight leading-[1.1] mb-6"
            >
              Financial infrastructure for{' '}
              <span className="bg-gradient-to-r from-violet-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                European trade
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              Millions of businesses use Sentinel to monitor VAT thresholds,
              automate compliance, and expand across all 27 EU Member States.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8"
            >
              <Link
                to="/sign-up"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-full text-base font-medium transition-all hover:scale-105 shadow-lg shadow-gray-900/10"
              >
                <span>Start now</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/sign-in"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-white hover:bg-gray-50 text-gray-900 px-8 py-4 rounded-full text-base font-medium border border-gray-200 transition-all"
              >
                <span>Contact sales</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-center justify-center space-x-8 text-sm text-gray-500"
            >
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-violet-600" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-violet-600" />
                <span>Free 14-day trial</span>
              </div>
              <div className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-violet-600" />
                <span>Cancel anytime</span>
              </div>
            </motion.div>
          </div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="mt-20 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10 pointer-events-none" style={{ height: '30%', bottom: 0, top: 'auto' }} />
            <div className="bg-gray-900 rounded-2xl p-2 shadow-2xl shadow-gray-900/20 border border-gray-800">
              <div className="bg-white rounded-xl overflow-hidden">
                {/* Mock browser bar */}
                <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2 border-b border-gray-200">
                  <div className="flex space-x-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 mx-4">
                    <div className="bg-white rounded-md px-3 py-1.5 text-xs text-gray-500 max-w-md mx-auto">
                      app.sentinel.eu/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-6 bg-gray-50">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <DashboardCard
                      title="OSS Threshold"
                      value="€7,250"
                      subtitle="of €10,000 limit"
                      percentage={72.5}
                      status="warning"
                    />
                    <DashboardCard
                      title="SME Exemption"
                      value="€45,000"
                      subtitle="of €100,000 limit"
                      percentage={45}
                      status="safe"
                    />
                    <DashboardCard
                      title="Countries Active"
                      value="12"
                      subtitle="EU Member States"
                      percentage={44}
                      status="safe"
                    />
                  </div>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-gray-900">Recent Transactions</h3>
                      <span className="text-sm text-violet-600">View all</span>
                    </div>
                    <div className="space-y-3">
                      <TransactionRow country="Germany" amount="€1,250" type="B2C" flag="🇩🇪" />
                      <TransactionRow country="France" amount="€890" type="B2C" flag="🇫🇷" />
                      <TransactionRow country="Netherlands" amount="€2,100" type="B2B" flag="🇳🇱" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos Section */}
      <section className="py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-sm text-gray-500 mb-8">
            Trusted by leading companies across Europe
          </p>
          <div className="flex items-center justify-center space-x-12 opacity-50">
            {['Shopify', 'Stripe', 'Notion', 'Figma', 'Linear', 'Vercel'].map((brand) => (
              <div key={brand} className="text-xl font-semibold text-gray-400">{brand}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need for EU compliance
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A complete toolkit to navigate VAT thresholds, manage cross-border sales,
              and stay compliant across all Member States.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Real-time Monitoring"
              description="Track your OSS (€10k) and SME (€100k) thresholds with live updates. Get alerts at 70%, 85%, and 95%."
            />
            <FeatureCard
              icon={<Globe2 className="w-6 h-6" />}
              title="27 Member States"
              description="Full coverage of all EU countries with automatic VAT rate updates and country-specific compliance rules."
            />
            <FeatureCard
              icon={<Bell className="w-6 h-6" />}
              title="Smart Alerts"
              description="Email notifications when approaching thresholds. Never miss a registration deadline or filing requirement."
            />
            <FeatureCard
              icon={<FileCheck className="w-6 h-6" />}
              title="Document Management"
              description="Store and organize invoices, certificates, and compliance documents with automatic OCR extraction."
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="GDPR Compliant"
              description="Your data is protected with enterprise-grade security. Export or delete your data anytime."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Instant Reports"
              description="Generate compliance reports for any period. Perfect for audits and quarterly VAT returns."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <StatCard value="10,000+" label="Businesses" />
            <StatCard value="€2.5B+" label="Transactions monitored" />
            <StatCard value="27" label="EU countries" />
            <StatCard value="99.9%" label="Uptime" />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to simplify EU compliance?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start your free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full sm:w-80 px-5 py-3.5 rounded-full border border-gray-300 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            />
            <Link
              to="/sign-up"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gray-900 hover:bg-gray-800 text-white px-8 py-3.5 rounded-full font-medium transition-all"
            >
              <span>Get started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-5 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-semibold text-gray-900">Sentinel</span>
              </div>
              <p className="text-gray-600 text-sm max-w-xs">
                Financial infrastructure for European trade. Monitor, automate, and scale across the EU.
              </p>
            </div>
            <FooterColumn
              title="Product"
              links={['Features', 'Pricing', 'Integrations', 'API']}
            />
            <FooterColumn
              title="Company"
              links={['About', 'Blog', 'Careers', 'Contact']}
            />
            <FooterColumn
              title="Legal"
              links={['Privacy', 'Terms', 'Security', 'GDPR']}
            />
          </div>
          <div className="pt-8 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">© 2025 Sentinel. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-900">Privacy</Link>
              <Link to="/terms" className="text-sm text-gray-500 hover:text-gray-900">Terms</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function DashboardCard({ title, value, subtitle, percentage, status }: {
  title: string;
  value: string;
  subtitle: string;
  percentage: number;
  status: 'safe' | 'warning' | 'danger';
}) {
  const statusColors = {
    safe: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-red-500',
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="text-sm text-gray-500 mb-1">{title}</div>
      <div className="text-2xl font-semibold text-gray-900 mb-1">{value}</div>
      <div className="text-xs text-gray-400 mb-3">{subtitle}</div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div
          className={`h-1.5 rounded-full ${statusColors[status]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function TransactionRow({ country, amount, type, flag }: {
  country: string;
  amount: string;
  type: string;
  flag: string;
}) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-3">
        <span className="text-lg">{flag}</span>
        <span className="text-sm text-gray-900">{country}</span>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded">{type}</span>
        <span className="text-sm font-medium text-gray-900">{amount}</span>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group p-6 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300"
    >
      <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center text-violet-600 mb-4 group-hover:bg-violet-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <div className="text-4xl font-bold text-white mb-2">{value}</div>
      <div className="text-gray-400">{label}</div>
    </div>
  );
}

function FooterColumn({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-semibold text-gray-900 mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link}>
            <a href="#" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
