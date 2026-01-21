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
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #635BFF 0%, #8B5CF6 100%)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#0A2540' }}>Sentinel</span>
            </Link>
            <div style={{ display: 'flex', gap: '28px' }}>
              {['Products', 'Solutions', 'Developers', 'Pricing'].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} style={{
                  fontSize: '15px',
                  color: '#425466',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}>
                  {item}
                </a>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Link to="/sign-in" style={{
              fontSize: '15px',
              fontWeight: 500,
              color: '#425466',
              textDecoration: 'none',
            }}>
              Sign in
            </Link>
            <Link to="/sign-up" style={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#ffffff',
              backgroundColor: '#635BFF',
              padding: '10px 20px',
              borderRadius: '9999px',
              textDecoration: 'none',
              transition: 'all 0.2s',
            }}>
              Start now →
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        paddingTop: '160px',
        paddingBottom: '120px',
        overflow: 'hidden',
      }}>
        {/* Gradient Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, #F6F9FC 0%, #FFFFFF 100%)',
        }} />

        {/* Animated Orbs */}
        <div style={{
          position: 'absolute',
          top: '10%',
          left: '15%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(99, 91, 255, 0.15) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />
        <div style={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(60px)',
        }} />

        <div style={{
          position: 'relative',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 24px',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}
          >
            {/* Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#F0EEFF',
              color: '#635BFF',
              padding: '8px 16px',
              borderRadius: '9999px',
              fontSize: '14px',
              fontWeight: 600,
              marginBottom: '32px',
            }}>
              <span style={{ fontSize: '16px' }}>⚡</span>
              Now supporting the 2025 EU SME VAT Scheme
            </div>

            {/* Main Headline */}
            <h1 style={{
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 700,
              color: '#0A2540',
              lineHeight: 1.1,
              margin: '0 0 24px 0',
              letterSpacing: '-0.02em',
            }}>
              Financial infrastructure for{' '}
              <span style={{
                background: 'linear-gradient(135deg, #635BFF 0%, #A855F7 50%, #635BFF 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>
                European trade
              </span>
            </h1>

            {/* Subheadline */}
            <p style={{
              fontSize: '20px',
              color: '#425466',
              lineHeight: 1.6,
              margin: '0 0 40px 0',
              maxWidth: '600px',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Millions of businesses use Sentinel to monitor VAT thresholds,
              automate compliance, and expand across all 27 EU Member States.
            </p>

            {/* CTA Buttons */}
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '16px',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginBottom: '32px',
            }}>
              <Link to="/sign-up" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#0A2540',
                color: '#ffffff',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'transform 0.2s, box-shadow 0.2s',
                boxShadow: '0 4px 14px rgba(10, 37, 64, 0.35)',
              }}>
                Start now
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </Link>
              <Link to="/sign-in" style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                backgroundColor: '#ffffff',
                color: '#0A2540',
                padding: '16px 32px',
                borderRadius: '9999px',
                fontSize: '16px',
                fontWeight: 600,
                textDecoration: 'none',
                border: '1px solid #E6E6E6',
                transition: 'all 0.2s',
              }}>
                Contact sales
              </Link>
            </div>

            {/* Trust Indicators */}
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '32px',
              flexWrap: 'wrap',
            }}>
              {[
                { icon: '✓', text: 'No credit card required' },
                { icon: '✓', text: 'Free 14-day trial' },
                { icon: '✓', text: 'Cancel anytime' },
              ].map((item) => (
                <div key={item.text} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '14px',
                  color: '#425466',
                }}>
                  <span style={{ color: '#635BFF', fontWeight: 700 }}>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{
              marginTop: '80px',
              perspective: '1000px',
            }}
          >
            <div style={{
              background: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 100%)',
              borderRadius: '16px',
              padding: '8px',
              boxShadow: '0 50px 100px -20px rgba(10, 37, 64, 0.25), 0 30px 60px -30px rgba(10, 37, 64, 0.3)',
            }}>
              <div style={{
                backgroundColor: '#ffffff',
                borderRadius: '10px',
                overflow: 'hidden',
              }}>
                {/* Browser Chrome */}
                <div style={{
                  backgroundColor: '#F8F9FA',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderBottom: '1px solid #E8EAED',
                }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FF5F57' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#FEBC2E' }} />
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#28C840' }} />
                  </div>
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                  }}>
                    <div style={{
                      backgroundColor: '#ffffff',
                      borderRadius: '6px',
                      padding: '6px 16px',
                      fontSize: '13px',
                      color: '#5F6368',
                      maxWidth: '400px',
                    }}>
                      🔒 app.sentinel.eu/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard Content */}
                <div style={{
                  padding: '24px',
                  backgroundColor: '#F6F9FC',
                }}>
                  {/* Stats Cards */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '16px',
                    marginBottom: '20px',
                  }}>
                    <DashboardCard
                      title="OSS Threshold"
                      value="€7,250"
                      subtitle="of €10,000 limit"
                      percentage={72.5}
                      color="#F59E0B"
                    />
                    <DashboardCard
                      title="SME Exemption"
                      value="€45,000"
                      subtitle="of €100,000 limit"
                      percentage={45}
                      color="#10B981"
                    />
                    <DashboardCard
                      title="Active Countries"
                      value="12"
                      subtitle="EU Member States"
                      percentage={44}
                      color="#635BFF"
                    />
                  </div>

                  {/* Transactions Table */}
                  <div style={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #E5E7EB',
                    overflow: 'hidden',
                  }}>
                    <div style={{
                      padding: '16px 20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderBottom: '1px solid #E5E7EB',
                    }}>
                      <span style={{ fontWeight: 600, color: '#0A2540' }}>Recent Transactions</span>
                      <span style={{ fontSize: '14px', color: '#635BFF', cursor: 'pointer' }}>View all →</span>
                    </div>
                    <div>
                      <TransactionRow flag="🇩🇪" country="Germany" amount="€1,250.00" type="B2C" status="Completed" />
                      <TransactionRow flag="🇫🇷" country="France" amount="€890.00" type="B2C" status="Completed" />
                      <TransactionRow flag="🇳🇱" country="Netherlands" amount="€2,100.00" type="B2B" status="Pending" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Logos Section */}
      <section style={{
        padding: '64px 24px',
        borderTop: '1px solid #F0F0F0',
        borderBottom: '1px solid #F0F0F0',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{
            textAlign: 'center',
            fontSize: '14px',
            color: '#8792A2',
            marginBottom: '32px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            Trusted by leading companies across Europe
          </p>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '48px',
            flexWrap: 'wrap',
            opacity: 0.4,
          }}>
            {['Shopify', 'Stripe', 'Notion', 'Figma', 'Linear', 'Vercel'].map((brand) => (
              <span key={brand} style={{
                fontSize: '20px',
                fontWeight: 700,
                color: '#425466',
              }}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '120px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{
              fontSize: '40px',
              fontWeight: 700,
              color: '#0A2540',
              marginBottom: '16px',
            }}>
              Everything you need for EU compliance
            </h2>
            <p style={{
              fontSize: '18px',
              color: '#425466',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              A complete toolkit to navigate VAT thresholds, manage cross-border sales,
              and stay compliant across all Member States.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px',
          }}>
            <FeatureCard
              icon="📊"
              title="Real-time Monitoring"
              description="Track your OSS (€10k) and SME (€100k) thresholds with live updates. Get alerts at 70%, 85%, and 95%."
            />
            <FeatureCard
              icon="🌍"
              title="27 Member States"
              description="Full coverage of all EU countries with automatic VAT rate updates and country-specific compliance rules."
            />
            <FeatureCard
              icon="🔔"
              title="Smart Alerts"
              description="Email notifications when approaching thresholds. Never miss a registration deadline or filing requirement."
            />
            <FeatureCard
              icon="📄"
              title="Document Management"
              description="Store and organize invoices, certificates, and compliance documents with automatic OCR extraction."
            />
            <FeatureCard
              icon="🛡️"
              title="GDPR Compliant"
              description="Your data is protected with enterprise-grade security. Export or delete your data anytime."
            />
            <FeatureCard
              icon="⚡"
              title="Instant Reports"
              description="Generate compliance reports for any period. Perfect for audits and quarterly VAT returns."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: '#0A2540',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
          textAlign: 'center',
        }}>
          {[
            { value: '10,000+', label: 'Businesses' },
            { value: '€2.5B+', label: 'Transactions monitored' },
            { value: '27', label: 'EU countries' },
            { value: '99.9%', label: 'Uptime' },
          ].map((stat) => (
            <div key={stat.label}>
              <div style={{ fontSize: '48px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '16px', color: '#8792A2' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '120px 24px' }}>
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          textAlign: 'center',
        }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: 700,
            color: '#0A2540',
            marginBottom: '16px',
          }}>
            Ready to simplify EU compliance?
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#425466',
            marginBottom: '32px',
          }}>
            Start your free trial today. No credit card required.
          </p>
          <div style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: '300px',
                padding: '16px 24px',
                borderRadius: '9999px',
                border: '1px solid #E5E7EB',
                fontSize: '16px',
                outline: 'none',
              }}
            />
            <Link to="/sign-up" style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              backgroundColor: '#0A2540',
              color: '#ffffff',
              padding: '16px 32px',
              borderRadius: '9999px',
              fontSize: '16px',
              fontWeight: 600,
              textDecoration: 'none',
            }}>
              Get started →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '64px 24px',
        backgroundColor: '#F6F9FC',
        borderTop: '1px solid #E5E7EB',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #635BFF 0%, #8B5CF6 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
            </div>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#0A2540' }}>Sentinel</span>
          </div>
          <div style={{ display: 'flex', gap: '32px' }}>
            <Link to="/privacy" style={{ fontSize: '14px', color: '#425466', textDecoration: 'none' }}>Privacy</Link>
            <Link to="/terms" style={{ fontSize: '14px', color: '#425466', textDecoration: 'none' }}>Terms</Link>
          </div>
          <p style={{ fontSize: '14px', color: '#8792A2' }}>© 2025 Sentinel. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function DashboardCard({ title, value, subtitle, percentage, color }: {
  title: string;
  value: string;
  subtitle: string;
  percentage: number;
  color: string;
}) {
  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      border: '1px solid #E5E7EB',
    }}>
      <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '8px' }}>{title}</div>
      <div style={{ fontSize: '28px', fontWeight: 700, color: '#0A2540', marginBottom: '4px' }}>{value}</div>
      <div style={{ fontSize: '12px', color: '#9CA3AF', marginBottom: '12px' }}>{subtitle}</div>
      <div style={{
        width: '100%',
        height: '6px',
        backgroundColor: '#E5E7EB',
        borderRadius: '3px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${percentage}%`,
          height: '100%',
          backgroundColor: color,
          borderRadius: '3px',
        }} />
      </div>
    </div>
  );
}

function TransactionRow({ flag, country, amount, type, status }: {
  flag: string;
  country: string;
  amount: string;
  type: string;
  status: string;
}) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 20px',
      borderBottom: '1px solid #F3F4F6',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <span style={{ fontSize: '20px' }}>{flag}</span>
        <span style={{ fontSize: '14px', fontWeight: 500, color: '#0A2540' }}>{country}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <span style={{
          fontSize: '12px',
          padding: '4px 10px',
          backgroundColor: type === 'B2C' ? '#EFF6FF' : '#F0FDF4',
          color: type === 'B2C' ? '#3B82F6' : '#22C55E',
          borderRadius: '4px',
          fontWeight: 500,
        }}>
          {type}
        </span>
        <span style={{
          fontSize: '12px',
          padding: '4px 10px',
          backgroundColor: status === 'Completed' ? '#F0FDF4' : '#FEF3C7',
          color: status === 'Completed' ? '#22C55E' : '#F59E0B',
          borderRadius: '4px',
          fontWeight: 500,
        }}>
          {status}
        </span>
        <span style={{ fontSize: '14px', fontWeight: 600, color: '#0A2540', minWidth: '90px', textAlign: 'right' }}>
          {amount}
        </span>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div style={{
      padding: '32px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      border: '1px solid #E5E7EB',
      transition: 'all 0.3s',
    }}>
      <div style={{
        width: '48px',
        height: '48px',
        backgroundColor: '#F0EEFF',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        marginBottom: '20px',
      }}>
        {icon}
      </div>
      <h3 style={{
        fontSize: '18px',
        fontWeight: 600,
        color: '#0A2540',
        marginBottom: '12px',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '15px',
        color: '#425466',
        lineHeight: 1.6,
        margin: 0,
      }}>
        {description}
      </p>
    </div>
  );
}
