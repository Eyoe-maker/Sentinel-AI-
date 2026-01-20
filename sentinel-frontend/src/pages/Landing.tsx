import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  TrendingUp,
  Bell,
  Globe,
  ArrowRight,
  CheckCircle,
  Sun,
  Moon,
} from 'lucide-react';

export default function Landing() {
  const [email, setEmail] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-slate-900' : 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'}`}>
      {/* Navigation */}
      <nav className="relative z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Sentinel
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className={`text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Features
            </a>
            <a href="#solutions" className={`text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Solutions
            </a>
            <a href="#pricing" className={`text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
              Pricing
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`p-2 rounded-lg ${darkMode ? 'bg-slate-800 text-yellow-400' : 'bg-white text-gray-600'} shadow-sm`}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <Link
              to="/sign-in"
              className={`text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
            >
              Sign In
            </Link>
            <Link
              to="/sign-up"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
            >
              Start for free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-32 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-30">
          <div className="absolute top-20 right-20 w-72 h-72 bg-purple-400 rounded-full blur-3xl" />
          <div className="absolute top-40 right-40 w-96 h-96 bg-pink-400 rounded-full blur-3xl" />
          <div className="absolute top-60 right-10 w-64 h-64 bg-indigo-400 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
                <span className="text-lg">⚡</span>
                <span>Now supporting the 2025 EU SME VAT Scheme</span>
              </div>

              <h1 className={`text-5xl lg:text-6xl font-bold leading-tight mb-6 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Compliance<br />
                infrastructure for<br />
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  European trade
                </span>
              </h1>

              <p className={`text-lg mb-8 max-w-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Navigate the 2025 SME VAT Scheme and cross-border permits automatically.
                Build your business across 27 Member States without the administrative friction.
              </p>

              {/* Email signup */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-5 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
                />
                <Link
                  to="/sign-up"
                  className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3.5 rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-500/25"
                >
                  <span>Start</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </motion.div>

            {/* Right side - Floating cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* Main dashboard card */}
              <div className="bg-white rounded-2xl shadow-2xl p-6 mb-4 border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-500">OSS Threshold</div>
                  <div className="flex items-center space-x-1 text-green-600 text-sm font-medium">
                    <TrendingUp className="w-4 h-4" />
                  </div>
                </div>
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-2xl font-bold text-gray-900">72.5% used</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full" style={{ width: '72.5%' }} />
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>€7,250</span>
                  <span>€10,000</span>
                </div>
              </div>

              {/* Floating status card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -right-4 top-4 bg-white rounded-xl shadow-lg p-4 border border-gray-100"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Healthy</div>
                    <div className="text-xs text-gray-500">All thresholds OK</div>
                  </div>
                </div>
              </motion.div>

              {/* Country cards */}
              <div className="grid grid-cols-2 gap-4 mt-4">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                      🇩🇪
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">Germany</div>
                      <div className="text-xs text-gray-500">DE VAT registered</div>
                    </div>
                    <CheckCircle className="w-4 h-4 text-green-500 ml-auto" />
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-white rounded-xl shadow-lg p-4 border border-gray-100"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-lg">
                      🇫🇷
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-900">France</div>
                      <div className="text-xs text-gray-500">OSS scheme</div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Alert card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-4"
              >
                <div className="flex items-start space-x-3">
                  <Bell className="w-5 h-5 text-amber-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-medium text-amber-800">Threshold Alert</div>
                    <div className="text-xs text-amber-700">OSS limit at 70% - consider registration review</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Everything you need for EU compliance
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Sentinel combines intelligent automation with deterministic tax logic for 100% accurate calculations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Real-time Threshold Tracking"
              description="Monitor your OSS (€10k) and SME (€100k) thresholds automatically. Get alerts at 70%, 85%, and 95%."
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="27 Member States"
              description="Full coverage of all EU countries with automatic VAT rate updates and country-specific rules."
              darkMode={darkMode}
            />
            <FeatureCard
              icon={<Bell className="w-6 h-6" />}
              title="Smart Notifications"
              description="Email alerts when you approach thresholds. Never miss a registration deadline again."
              darkMode={darkMode}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to simplify EU compliance?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join thousands of businesses using Sentinel to navigate cross-border trade.
          </p>
          <Link
            to="/sign-up"
            className="inline-flex items-center space-x-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            <span>Get Started Free</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 ${darkMode ? 'bg-slate-900' : 'bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className={`font-semibold ${darkMode ? 'text-white' : 'text-slate-900'}`}>Sentinel</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link to="/privacy" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Privacy Policy
              </Link>
              <Link to="/terms" className={`text-sm ${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}>
                Terms of Service
              </Link>
            </div>
            <p className={`text-sm mt-4 md:mt-0 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
              © 2025 Sentinel. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  darkMode
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  darkMode: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`p-6 rounded-2xl border ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-gray-50 border-gray-100'} hover:shadow-lg transition-shadow`}
    >
      <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4">
        {icon}
      </div>
      <h3 className={`text-xl font-semibold mb-2 ${darkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h3>
      <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>{description}</p>
    </motion.div>
  );
}
