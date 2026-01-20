import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Shield,
  Target,
  Zap,
  Globe,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import MeshGradient from '../components/MeshGradient';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero section */}
      <section className="relative overflow-hidden">
        {/* WebGL Mesh Gradient Background */}
        <div className="absolute inset-0">
          <MeshGradient />
        </div>

        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-2 mb-6">
              <Shield className="w-12 h-12 text-white drop-shadow-lg" />
              <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                SENTINEL
              </h1>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Browser-Native Compliance Engine
            </h2>

            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8 drop-shadow">
              Dismantle the #1 barrier to the European Single Market: fragmented taxation
              and permit filing across 27 different government portals.
            </p>

            <div className="flex items-center justify-center space-x-4">
              <Link
                to="/sign-up"
                className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/sign-in"
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur text-white border-2 border-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/20 transition-colors"
              >
                <span>Sign In</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">The Problem</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              70% of EU SMEs stay domestic because expanding requires navigating
              27 different "API-less" government portals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProblemCard
              number="14.4"
              unit="weeks"
              description="Average time for manual cross-border filing"
            />
            <ProblemCard
              number="€5,000"
              unit="per employee"
              description="Potential fines for simple filing errors"
            />
            <ProblemCard
              number="27"
              unit="portals"
              description="Different government systems to navigate"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-slate-950 mb-4">
              The Sentinel Solution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              A Neuro-Symbolic Agent that combines LLM intelligence with
              deterministic math for 100% accurate tax logic
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Target}
              title="Deterministic VAT Engine"
              description="Hard-coded EU statutory rules (€10k OSS, €100k SME) eliminate the 58-88% hallucination rate of pure LLMs in legal matters."
              color="text-primary"
            />
            <FeatureCard
              icon={Zap}
              title="Playwright Automation"
              description="Browser automation acts as 'hands and eyes' to navigate legacy portals like France's SIPSI, creating audit trails with screenshot evidence."
              color="text-accent-cyan"
            />
            <FeatureCard
              icon={Globe}
              title="MCP Data Bridge"
              description="Model Context Protocol connects real-time accounting data from DATEV and bank feeds via Plaid, enabling automatic threshold monitoring."
              color="text-accent-mint"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-slate-950 mb-12 text-center">
            How It Works
          </h2>

          <div className="space-y-8">
            <WorkflowStep
              number={1}
              title="Real-Time Threshold Monitoring"
              description="Sentinel tracks your transactions against EU thresholds. When you reach 72.5% of any limit, you receive an 'Attention Required' alert."
            />
            <WorkflowStep
              number={2}
              title="Automated OCR Extraction"
              description="Upload A1 certificates and posted worker documents. OCR automatically extracts worker names, certificate IDs, and validity periods."
            />
            <WorkflowStep
              number={3}
              title="Browser Automation with Human Oversight"
              description="Playwright navigates government portals using stealth techniques and human-like movement. Every step is captured as screenshots for audit trails."
            />
            <WorkflowStep
              number={4}
              title="Click-to-Sign Approval"
              description="No submission occurs without your explicit approval. You maintain full control while Sentinel handles the tedious form-filling."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Expand Across Europe?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join the SMEs using Sentinel to navigate EU compliance with confidence
          </p>
          <Link
            to="/sign-up"
            className="inline-flex items-center space-x-2 bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span className="font-semibold">SENTINEL</span>
            </div>
            <p className="text-gray-400 text-sm">
              Browser-Native Compliance Engine © 2025
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ProblemCard({
  number,
  unit,
  description,
}: {
  number: string;
  unit: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-lg p-8 text-center"
    >
      <div className="text-5xl font-bold text-primary mb-2">{number}</div>
      <div className="text-lg text-gray-300 mb-4">{unit}</div>
      <div className="text-sm text-gray-400">{description}</div>
    </motion.div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white border border-gray-200 rounded-lg p-8 hover:shadow-lg transition-shadow"
    >
      <Icon className={`w-12 h-12 ${color} mb-4`} />
      <h3 className="text-xl font-bold text-slate-950 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}

function WorkflowStep({
  number,
  title,
  description,
}: {
  number: number;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="flex items-start space-x-6"
    >
      <div className="flex-shrink-0 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
        {number}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-950 mb-2 flex items-center space-x-2">
          <span>{title}</span>
          <CheckCircle2 className="w-5 h-5 text-green-600" />
        </h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
