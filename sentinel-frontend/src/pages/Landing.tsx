import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Landing() {
  const [email, setEmail] = useState('');

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid #f0f0f0',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          height: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '11px',
                color: 'white',
                fontWeight: 700,
                flexDirection: 'column',
                lineHeight: 1,
              }}>
                <span style={{ fontSize: '16px' }}>⬡</span>
                <span style={{ fontSize: '8px', marginTop: '2px' }}>SENTINEL</span>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a2e' }}>Sentinel</span>
            </Link>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Features', 'Solutions', 'Pricing'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} style={{
                  fontSize: '15px',
                  color: '#64748b',
                  textDecoration: 'none',
                  fontWeight: 500,
                }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: '#64748b',
            }}>
              ☀️
            </button>
            <Link to="/sign-in" style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#1a1a2e',
              textDecoration: 'none',
            }}>
              Sign In
            </Link>
            <Link to="/sign-up" style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#ffffff',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              padding: '10px 20px',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              Start for free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        paddingTop: '140px',
        paddingBottom: '80px',
        background: 'linear-gradient(180deg, #EEF2FF 0%, #F5F3FF 50%, #FFFFFF 100%)',
        overflow: 'hidden',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '60px',
          alignItems: 'center',
        }}>
          {/* Left side - Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#EEF2FF',
              border: '1px solid #C7D2FE',
              color: '#6366F1',
              padding: '6px 14px',
              borderRadius: '20px',
              fontSize: '13px',
              fontWeight: 500,
              marginBottom: '24px',
            }}>
              <span>⚡</span>
              Now supporting the 2025 EU SME VAT Scheme
            </div>

            <h1 style={{
              fontSize: '52px',
              fontWeight: 700,
              color: '#1a1a2e',
              lineHeight: 1.15,
              margin: '0 0 20px 0',
            }}>
              Compliance<br />
              infrastructure for<br />
              <span style={{ color: '#6366F1' }}>European trade</span>
            </h1>

            <p style={{
              fontSize: '18px',
              color: '#64748b',
              lineHeight: 1.6,
              margin: '0 0 32px 0',
              maxWidth: '480px',
            }}>
              Navigate the 2025 SME VAT Scheme and cross-border permits automatically.
              Build your business across 27 Member States without the administrative friction.
            </p>

            {/* Email signup */}
            <div style={{
              display: 'flex',
              gap: '12px',
              marginBottom: '20px',
              maxWidth: '440px',
            }}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: '1px solid #e2e8f0',
                  fontSize: '15px',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              />
              <Link to="/sign-up" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                color: '#ffffff',
                padding: '14px 24px',
                borderRadius: '10px',
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                whiteSpace: 'nowrap',
              }}>
                Start →
              </Link>
            </div>

            <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#10B981' }}>✓</span> No credit card required
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#10B981' }}>✓</span> 14-day free trial
              </span>
            </div>
          </motion.div>

          {/* Right side - Floating cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ position: 'relative', height: '500px' }}
          >
            {/* Main threshold card */}
            <div style={{
              position: 'absolute',
              top: '0',
              left: '0',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              width: '280px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                <div style={{ width: '36px', height: '36px', backgroundColor: '#EEF2FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1' }}>📈</div>
                <div>
                  <div style={{ fontSize: '14px', color: '#64748b' }}>OSS Threshold</div>
                  <div style={{ fontSize: '18px', fontWeight: 600, color: '#1a1a2e' }}>72.5% used</div>
                </div>
              </div>
              <div style={{ backgroundColor: '#E5E7EB', borderRadius: '4px', height: '8px', marginBottom: '8px' }}>
                <div style={{ backgroundColor: '#6366F1', borderRadius: '4px', height: '8px', width: '72.5%' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b' }}>
                <span>€7,250</span>
                <span>€10,000</span>
              </div>
            </div>

            {/* Healthy status card */}
            <div style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '12px 16px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}>
              <span style={{ fontSize: '13px', color: '#1a1a2e', fontWeight: 500 }}>Healthy</span>
              <span style={{
                backgroundColor: '#D1FAE5',
                color: '#059669',
                padding: '4px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
              }}>Healthy</span>
            </div>

            {/* Germany card */}
            <div style={{
              position: 'absolute',
              top: '160px',
              left: '40px',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '14px 18px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '24px' }}>🇩🇪</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a2e' }}>Germany</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>DE VAT registered</div>
              </div>
              <span style={{ color: '#10B981', marginLeft: '8px' }}>✓</span>
            </div>

            {/* France card */}
            <div style={{
              position: 'absolute',
              top: '240px',
              left: '0',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '14px 18px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}>
              <span style={{ fontSize: '24px' }}>🇫🇷</span>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 500, color: '#1a1a2e' }}>France</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>OSS scheme active</div>
              </div>
            </div>

            {/* Alert card */}
            <div style={{
              position: 'absolute',
              top: '180px',
              right: '0',
              backgroundColor: '#ffffff',
              borderRadius: '12px',
              padding: '14px 18px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
              maxWidth: '220px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ color: '#F59E0B' }}>🔔</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#1a1a2e' }}>Threshold Alert</span>
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>
                OSS limit at 70% - consider registration review
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modular Solutions Section */}
      <section id="solutions" style={{ padding: '100px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div style={{ color: '#6366F1', fontSize: '14px', fontWeight: 600, marginBottom: '12px' }}>Modular solutions</div>
            <h2 style={{ fontSize: '40px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 20px 0', lineHeight: 1.2 }}>
              A complete suite of compliance and VAT management tools
            </h2>
            <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.7, margin: '0 0 32px 0' }}>
              Reduce your administrative burden, track thresholds in real-time, and stay compliant with an integrated platform built for the complexity of EU cross-border trade.
            </p>
            <Link to="/sign-up" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              color: '#ffffff',
              padding: '14px 28px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              Discover solutions →
            </Link>
          </div>

          {/* Solutions grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {[
              { icon: '📊', label: 'Thresholds', active: true },
              { icon: '📈', label: 'Analytics' },
              { icon: '📄', label: 'Documents' },
              { icon: '🔔', label: 'Alerts' },
              { icon: '🌍', label: 'Countries' },
              { icon: '💶', label: 'VAT Rates' },
              { icon: '📋', label: 'Reports' },
              { icon: '🏢', label: 'Entities' },
              { icon: '🔒', label: 'Vault' },
            ].map((item) => (
              <div key={item.label} style={{
                backgroundColor: item.active ? '#EEF2FF' : '#F8FAFC',
                border: item.active ? '2px solid #6366F1' : '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{item.icon}</div>
                <div style={{ fontSize: '13px', fontWeight: 500, color: item.active ? '#6366F1' : '#64748b' }}>{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Threshold Monitoring Section */}
      <section style={{ padding: '100px 24px', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          {/* Threshold card */}
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ width: '40px', height: '40px', backgroundColor: '#EEF2FF', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6366F1' }}>📊</div>
              <div>
                <div style={{ fontSize: '16px', fontWeight: 600, color: '#1a1a2e' }}>Threshold Sentinel</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>Real-time monitoring</div>
              </div>
            </div>

            {/* OSS bar */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#1a1a2e' }}>OSS Threshold (€10,000)</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#F59E0B' }}>72.5%</span>
              </div>
              <div style={{ backgroundColor: '#E5E7EB', borderRadius: '4px', height: '10px' }}>
                <div style={{ backgroundColor: '#F59E0B', borderRadius: '4px', height: '10px', width: '72.5%' }} />
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>€7,250 of €10,000 used</div>
            </div>

            {/* SME bar */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ fontSize: '14px', color: '#1a1a2e' }}>SME Scheme (€100,000)</span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: '#10B981' }}>34.2%</span>
              </div>
              <div style={{ backgroundColor: '#E5E7EB', borderRadius: '4px', height: '10px' }}>
                <div style={{ backgroundColor: '#10B981', borderRadius: '4px', height: '10px', width: '34.2%' }} />
              </div>
              <div style={{ fontSize: '12px', color: '#64748b', marginTop: '6px' }}>€34,200 of €100,000 used</div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ color: '#6366F1' }}>📊</span>
              <span style={{ color: '#6366F1', fontSize: '14px', fontWeight: 600 }}>Threshold Monitoring</span>
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 20px 0', lineHeight: 1.2 }}>
              Never cross a threshold unprepared
            </h2>
            <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.7, margin: '0 0 28px 0' }}>
              Monitor OSS and SME scheme limits in real-time. Get proactive alerts at 70% and 90% so you can plan registrations before deadlines hit.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Real-time threshold calculations across all EU markets',
                'Automated alerts before critical limits',
                'Deterministic VAT calculations - no AI guesswork',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#1a1a2e' }}>
                  <span style={{ color: '#10B981' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Browser Operator Section */}
      <section style={{ padding: '100px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <span style={{ backgroundColor: '#D1FAE5', padding: '6px', borderRadius: '8px' }}>🤖</span>
              <span style={{ color: '#10B981', fontSize: '14px', fontWeight: 600 }}>Browser Operator</span>
            </div>
            <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 20px 0', lineHeight: 1.2 }}>
              Automate tax portal submissions
            </h2>
            <p style={{ fontSize: '17px', color: '#64748b', lineHeight: 1.7, margin: '0 0 28px 0' }}>
              Our browser agent navigates French SIPSI declarations and EU tax portals automatically. Submit forms in languages you don't speak, with complete audit trails.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                'Automated form filling with extracted data',
                'Multi-language portal support via DeepL',
                'Complete submission records for audits',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: '#1a1a2e' }}>
                  <span style={{ color: '#10B981' }}>✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Terminal preview */}
          <div style={{
            backgroundColor: '#1a1a2e',
            borderRadius: '16px',
            padding: '24px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '36px', height: '36px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🤖</div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: 600, color: '#ffffff' }}>Browser Operator</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Automated submissions</div>
              </div>
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '13px', lineHeight: 1.8 }}>
              <div style={{ color: '#10B981' }}>Navigating to sipsi.travail.gouv.fr</div>
              <div style={{ color: '#10B981' }}>Filling form Declaration A1...</div>
              <div style={{ color: '#10B981' }}>Submitting with certificate...</div>
              <div style={{ color: '#10B981', marginTop: '8px' }}>✓ Submission confirmed - ID: FR-2025-847291</div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section style={{ padding: '100px 24px', backgroundColor: '#F8FAFC' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px 0' }}>
            Connect your existing stack
          </h2>
          <p style={{ fontSize: '17px', color: '#64748b', margin: '0 0 48px 0' }}>
            Sentinel integrates with your accounting and banking tools
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginBottom: '32px' }}>
            {[
              { letter: 'D', name: 'DATEV', desc: 'Accounting', color: '#6366F1' },
              { letter: 'P', name: 'Plaid', desc: 'Banking', color: '#10B981' },
              { letter: 'O', name: 'Odoo', desc: 'ERP', color: '#A855F7' },
              { letter: 'D', name: 'DeepL', desc: 'Translation', color: '#F59E0B' },
            ].map((item) => (
              <div key={item.name} style={{
                backgroundColor: '#ffffff',
                border: '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '24px 32px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: `${item.color}15`,
                  color: item.color,
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '20px',
                  fontWeight: 700,
                  margin: '0 auto 12px auto',
                }}>
                  {item.letter}
                </div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a2e' }}>{item.name}</div>
                <div style={{ fontSize: '13px', color: '#64748b' }}>{item.desc}</div>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '14px', color: '#64748b' }}>
            More integrations coming soon. <a href="#" style={{ color: '#6366F1', textDecoration: 'none' }}>View all integrations</a>
          </p>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" style={{ padding: '100px 24px', backgroundColor: '#ffffff' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '40px', fontWeight: 700, color: '#1a1a2e', margin: '0 0 16px 0' }}>
            Simple, transparent pricing
          </h2>
          <p style={{ fontSize: '17px', color: '#64748b', margin: '0 0 48px 0' }}>
            Choose the plan that fits your business needs
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
            {/* Starter */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>Starter</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                <span style={{ fontSize: '48px', fontWeight: 700, color: '#1a1a2e' }}>€99</span>
                <span style={{ fontSize: '16px', color: '#64748b' }}>/month</span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>Perfect for small businesses starting cross-border sales</p>

              <Link to="/sign-up" style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px',
                backgroundColor: '#F1F5F9',
                color: '#1a1a2e',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                marginBottom: '24px',
              }}>
                Get started
              </Link>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'OSS threshold tracking',
                  'Up to 500 transactions/month',
                  'Email alerts at 70% & 90%',
                  'Basic reporting',
                  'Email support',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#1a1a2e' }}>
                    <span style={{ color: '#10B981' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Professional - Highlighted */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '2px solid #6366F1',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'left',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(99, 102, 241, 0.15)',
            }}>
              <div style={{
                position: 'absolute',
                top: '-12px',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#6366F1',
                color: '#ffffff',
                padding: '4px 16px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
              }}>
                Most Popular
              </div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#6366F1', marginBottom: '8px' }}>Professional</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                <span style={{ fontSize: '48px', fontWeight: 700, color: '#1a1a2e' }}>€299</span>
                <span style={{ fontSize: '16px', color: '#64748b' }}>/month</span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>For growing businesses with multi-country operations</p>

              <Link to="/sign-up" style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px',
                background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
                color: '#ffffff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                marginBottom: '24px',
              }}>
                Get started
              </Link>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'OSS & SME threshold tracking',
                  'Unlimited transactions',
                  'Real-time compliance alerts',
                  'Browser Operator automation',
                  'Document vault & OCR',
                  'DATEV & Plaid integrations',
                  'Priority support',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#1a1a2e' }}>
                    <span style={{ color: '#10B981' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Enterprise */}
            <div style={{
              backgroundColor: '#ffffff',
              border: '1px solid #E2E8F0',
              borderRadius: '16px',
              padding: '32px',
              textAlign: 'left',
            }}>
              <div style={{ fontSize: '14px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>Enterprise</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginBottom: '8px' }}>
                <span style={{ fontSize: '48px', fontWeight: 700, color: '#1a1a2e' }}>Custom</span>
              </div>
              <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>For large organizations with complex compliance needs</p>

              <Link to="/sign-up" style={{
                display: 'block',
                textAlign: 'center',
                padding: '12px',
                backgroundColor: '#1a1a2e',
                color: '#ffffff',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: 600,
                marginBottom: '24px',
              }}>
                Contact sales
              </Link>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Everything in Professional',
                  'Multiple legal entities',
                  'Custom integrations',
                  'Dedicated account manager',
                  'SLA guarantee',
                  'On-premise deployment option',
                  'Compliance consulting',
                ].map((item) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', color: '#1a1a2e' }}>
                    <span style={{ color: '#10B981' }}>✓</span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#ffffff', margin: '0 0 16px 0' }}>
            Ready to simplify EU compliance?
          </h2>
          <p style={{ fontSize: '17px', color: 'rgba(255,255,255,0.9)', margin: '0 0 32px 0' }}>
            Join thousands of businesses using Sentinel to navigate cross-border trade.
          </p>
          <Link to="/sign-up" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#ffffff',
            color: '#6366F1',
            padding: '16px 32px',
            borderRadius: '10px',
            fontSize: '16px',
            fontWeight: 600,
            textDecoration: 'none',
          }}>
            Start your free trial →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '48px 24px',
        backgroundColor: '#1a1a2e',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: 'white',
            }}>
              ⬡
            </div>
            <span style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff' }}>Sentinel</span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            <Link to="/privacy" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/terms" style={{ fontSize: '14px', color: '#64748b', textDecoration: 'none' }}>Terms</Link>
          </div>
          <p style={{ fontSize: '14px', color: '#64748b' }}>© 2025 Sentinel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
