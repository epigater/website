'use client'

import { useState, useEffect } from 'react'
import { 
  Brain, 
  Cpu, 
  Shield, 
  Sun, 
  Factory, 
  Globe, 
  ArrowRight, 
  CheckCircle2, 
  Users, 
  Award, 
  TrendingUp,
  Menu,
  X,
  Mail,
  Phone,
  MapPin,
  ChevronRight,
  Sparkles,
  Zap,
  Lock,
  BarChart3,
  Layers,
  Target
} from 'lucide-react'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      
      const sections = ['home', 'about', 'services', 'divisions', 'why-us', 'contact']
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element && element.getBoundingClientRect().top <= 100) {
          setActiveSection(section)
          break
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/20' : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Epigater Solutions" className="h-12 w-auto" />
              <div className="hidden sm:block">
                <span className="text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  EPIGATER
                </span>
                <span className="block text-xs font-medium text-slate-500 tracking-wider">SOLUTIONS</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'services', label: 'Services' },
                { id: 'divisions', label: 'Divisions' },
                { id: 'why-us', label: 'Why Us' },
                { id: 'contact', label: 'Contact' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-sm font-medium transition-colors relative group ${
                    activeSection === item.id ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-600 to-blue-600 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-slate-400/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>

            <button 
              className="md:hidden p-2 rounded-lg hover:bg-slate-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 shadow-xl">
            <div className="px-4 py-6 space-y-4">
              {['home', 'about', 'services', 'divisions', 'why-us', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-4 py-3 rounded-xl text-slate-700 hover:bg-slate-50 hover:text-slate-900 font-medium capitalize transition-colors"
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section - With Prominent Network Pattern Background */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Network Pattern Background - More Visible */}
        <div 
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: `url('/bg-pattern.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }} 
        />
        
        {/* Light Gradient Overlay on top of pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/60 to-cyan-50/40" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-full shadow-sm">
                <Sparkles size={16} className="text-cyan-600" />
                <span className="text-sm font-medium text-slate-700">Welcome to Epigater</span>
              </div>
              
              {/* UPDATED HEADLINE */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1]">
                <span className="bg-gradient-to-r from-cyan-700 via-blue-700 to-slate-800 bg-clip-text text-transparent">
                  Intelligence
                </span>
                <br />
                <span className="text-slate-900">Without</span>
                <br />
                <span className="text-slate-900">Limits</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                AI-driven solutions that empower organizations to operate more efficiently, securely, and sustainably. From intelligent software to smart energy systems.
              </p>

              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-full font-semibold hover:shadow-xl hover:shadow-slate-400/25 transition-all duration-300 hover:-translate-y-1"
                >
                  Explore Solutions
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-800 rounded-full font-semibold border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">150+</div>
                  <div className="text-sm text-slate-500">Projects Delivered</div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">98%</div>
                  <div className="text-sm text-slate-500">Client Satisfaction</div>
                </div>
                <div className="w-px h-12 bg-slate-200" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900">24/7</div>
                  <div className="text-sm text-slate-500">Support Available</div>
                </div>
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="relative z-10">
                <img 
                  src="/logo.png" 
                  alt="Epigater Solutions Logo" 
                  className="w-full max-w-lg mx-auto drop-shadow-2xl"
                />
              </div>
              
              {/* Floating Cards */}
              <div className="absolute top-10 -left-10 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <TrendingUp size={20} className="text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">Growth Rate</div>
                    <div className="text-lg font-bold text-emerald-600">+47%</div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-20 -right-5 p-4 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-cyan-100 rounded-xl">
                    <Brain size={20} className="text-cyan-600" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-800">AI Powered</div>
                    <div className="text-lg font-bold text-cyan-600">Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section - With visible pattern */}
      <section id="about" className="py-24 relative overflow-hidden">
        {/* Visible Network Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `url('/bg-pattern.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-slate-50/80" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-slate-100 to-cyan-50 rounded-3xl blur-2xl opacity-80" />
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-sm">
                    <Award size={14} />
                    Since 2020
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-bold leading-tight">
                    Building Intelligent Systems for a Digital Future
                  </h3>
                  <p className="text-slate-300 leading-relaxed">
                    We combine cutting-edge AI technology with deep industry expertise to deliver transformative solutions that drive real business value.
                  </p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    {[
                      { icon: Brain, label: 'AI & Machine Learning' },
                      { icon: Shield, label: 'Cybersecurity' },
                      { icon: Cpu, label: 'Enterprise Software' },
                      { icon: Sun, label: 'Smart Energy' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                        <item.icon size={20} className="text-cyan-400" />
                        <span className="text-sm">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div>
                <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">Who We Are</span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900 leading-tight">
                  About Epigater Solutions
                </h2>
              </div>

              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900">Epigater Solutions</strong> is an AI-driven technology, engineering and international trading company focused on developing, integrating and implementing intelligent systems that enable organizations to operate more efficiently, securely and sustainably.
                </p>
                <p>
                  We design and deliver AI-enhanced software applications, enterprise resource planning systems, business automation platforms, mobile applications, cloud solutions, cybersecurity systems, data infrastructure, smart energy technologies, industrial automation solutions and integrated digital platforms.
                </p>
                <p>
                  Our unique strength lies in combining artificial intelligence, software engineering, infrastructure integration, smart energy, industrial technology and international trade under one coordinated corporate structure.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-4">
                {[
                  { value: '6+', label: 'Core Business Divisions' },
                  { value: 'Global', label: 'Market Reach' },
                  { value: 'End-to-End', label: 'Solution Delivery' },
                  { value: '24/7', label: 'Technical Support' }
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm">
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-sm text-slate-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Clean white with subtle but visible pattern */}
      <section id="services" className="py-24 relative overflow-hidden">
        {/* Visible Dot Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url('/bg-pattern.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/90 via-white to-slate-50/90" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 rounded-full text-sm font-medium shadow-sm">
              <Zap size={16} className="text-cyan-600" />
              Our Services
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900">
              Comprehensive Technology Solutions
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              End-to-end services designed to transform your organization through intelligent technology integration
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: 'AI & Machine Learning',
                description: 'Custom AI solutions including predictive analytics, natural language processing, computer vision, and intelligent automation systems.',
                features: ['Predictive Analytics', 'NLP Solutions', 'Computer Vision', 'Process Automation'],
                color: 'cyan'
              },
              {
                icon: Cpu,
                title: 'Enterprise Software',
                description: 'Scalable enterprise applications including ERP systems, CRM platforms, business intelligence tools, and custom development.',
                features: ['ERP Systems', 'CRM Platforms', 'Business Intelligence', 'Custom Development'],
                color: 'slate'
              },
              {
                icon: Shield,
                title: 'Cybersecurity',
                description: 'Comprehensive security solutions protecting your digital assets with advanced threat detection and incident response.',
                features: ['Threat Detection', 'Security Audits', 'Data Protection', 'Incident Response'],
                color: 'emerald'
              },
              {
                icon: CloudIcon,
                title: 'Cloud Solutions',
                description: 'Cloud architecture design, migration services, and managed cloud infrastructure ensuring scalability and reliability.',
                features: ['Cloud Migration', 'Architecture Design', 'Managed Services', 'DevOps'],
                color: 'blue'
              },
              {
                icon: Sun,
                title: 'Smart Energy',
                description: 'IoT-enabled energy management systems, renewable energy integration, and smart grid solutions.',
                features: ['Energy Management', 'IoT Integration', 'Renewable Systems', 'Grid Optimization'],
                color: 'amber'
              },
              {
                icon: Factory,
                title: 'Industrial Automation',
                description: 'Industry 4.0 solutions including IoT sensors, PLC programming, SCADA systems, and manufacturing execution.',
                features: ['IoT Sensors', 'PLC Programming', 'SCADA Systems', 'MES Solutions'],
                color: 'violet'
              }
            ].map((service, index) => (
              <div 
                key={index}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-slate-50/50 group-hover:from-cyan-50/30 group-hover:to-transparent rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100" />
                
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    service.color === 'cyan' ? 'bg-cyan-100' :
                    service.color === 'slate' ? 'bg-slate-100' :
                    service.color === 'emerald' ? 'bg-emerald-100' :
                    service.color === 'blue' ? 'bg-blue-100' :
                    service.color === 'amber' ? 'bg-amber-100' :
                    'bg-violet-100'
                  }`}>
                    <service.icon size={28} className={
                      service.color === 'cyan' ? 'text-cyan-700' :
                      service.color === 'slate' ? 'text-slate-700' :
                      service.color === 'emerald' ? 'text-emerald-700' :
                      service.color === 'blue' ? 'text-blue-700' :
                      service.color === 'amber' ? 'text-amber-700' :
                      'text-violet-700'
                    } />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                        <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Divisions - With visible pattern background */}
      <section id="divisions" className="py-24 relative overflow-hidden">
        {/* Visible Network Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `url('/bg-pattern.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-slate-50/90" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 border border-slate-200 text-slate-700 rounded-full text-sm font-medium">
              <Layers size={16} />
              Business Divisions
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-slate-900">
              Six Pillars of Excellence
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Our integrated divisions work together to deliver comprehensive solutions across technology domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                bgColor: 'bg-violet-50',
                borderColor: 'border-violet-200',
                textColor: 'text-violet-700',
                title: 'Artificial Intelligence Division',
                description: 'Developing and deploying AI models, machine learning pipelines, and intelligent automation solutions.',
                capabilities: ['Deep Learning', 'NLP & Conversational AI', 'Computer Vision', 'MLOps & Deployment']
              },
              {
                icon: Cpu,
                bgColor: 'bg-slate-100',
                borderColor: 'border-slate-300',
                textColor: 'text-slate-700',
                title: 'Enterprise Software Division',
                description: 'Building scalable software platforms, ERP systems, and business applications that drive operational excellence.',
                capabilities: ['Enterprise Applications', 'System Integration', 'API Development', 'Quality Assurance']
              },
              {
                icon: Globe,
                bgColor: 'bg-cyan-50',
                borderColor: 'border-cyan-200',
                textColor: 'text-cyan-700',
                title: 'Technology Integration Division',
                description: 'Seamlessly connecting disparate systems, legacy modernization, and creating unified technology ecosystems.',
                capabilities: ['System Integration', 'Legacy Modernization', 'Data Migration', 'Infrastructure Planning']
              },
              {
                icon: Sun,
                bgColor: 'bg-amber-50',
                borderColor: 'border-amber-200',
                textColor: 'text-amber-700',
                title: 'Smart Energy Division',
                description: 'Delivering IoT-based energy monitoring, renewable energy solutions, and smart grid technologies.',
                capabilities: ['Energy Monitoring', 'Solar & Wind Integration', 'Smart Metering', 'Sustainability Consulting']
              },
              {
                icon: Factory,
                bgColor: 'bg-emerald-50',
                borderColor: 'border-emerald-200',
                textColor: 'text-emerald-700',
                title: 'Smart Manufacturing Division',
                description: 'Implementing Industry 4.0 technologies, production optimization, and connected factory solutions.',
                capabilities: ['IIoT Implementation', 'Production Analytics', 'Digital Twin', 'Quality Automation']
              },
              {
                icon: BarChart3,
                bgColor: 'bg-rose-50',
                borderColor: 'border-rose-200',
                textColor: 'text-rose-700',
                title: 'International Trading Division',
                description: 'Facilitating global technology trade, equipment sourcing, and international market expansion services.',
                capabilities: ['Equipment Sourcing', 'Import/Export', 'Supply Chain', 'Market Expansion']
              }
            ].map((division, index) => (
              <div 
                key={index}
                className={`group relative ${division.bgColor} rounded-3xl p-8 border ${division.borderColor} hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 bg-white rounded-xl shadow-sm`}>
                    <division.icon size={24} className={division.textColor} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-slate-900">{division.title}</h3>
                  </div>
                </div>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{division.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {division.capabilities.map((cap, i) => (
                    <span 
                      key={i}
                      className="px-3 py-1 bg-white/80 rounded-full text-xs font-medium text-slate-700"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Dark section with dot pattern (like reference image) */}
      <section id="why-us" className="py-24 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Visible Subtle Dot Pattern - Like the reference image */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
        
        {/* Network Pattern Overlay - Visible */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `url('/bg-pattern.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 text-cyan-400 rounded-full text-sm font-medium border border-white/10">
              <Target size={16} />
              Why Choose Us
            </span>
            <h2 className="mt-6 text-4xl sm:text-5xl font-bold text-white">
              The Epigater Advantage
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              What sets us apart in delivering transformative technology solutions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Lock,
                title: 'Integrated Approach',
                description: 'Single vendor providing end-to-end solutions from strategy to implementation and support.'
              },
              {
                icon: Users,
                title: 'Expert Team',
                description: 'Multidisciplinary professionals with deep expertise across all technology domains.'
              },
              {
                icon: Zap,
                title: 'Innovation First',
                description: 'Cutting-edge AI and automation technologies that keep you ahead of competition.'
              },
              {
                icon: Globe,
                title: 'Global Reach',
                description: 'International presence enabling seamless cross-border project delivery.'
              }
            ].map((item, index) => (
              <div key={index} className="group text-center">
                <div className="inline-flex p-5 bg-white/5 backdrop-blur-sm rounded-2xl mb-6 group-hover:bg-white/10 transition-colors border border-white/10">
                  <item.icon size={32} className="text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-20 grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">Our Delivery Methodology</h3>
              <div className="space-y-6">
                {[
                  { step: '01', title: 'Discovery & Analysis', desc: 'Understanding your business challenges and objectives' },
                  { step: '02', title: 'Strategy & Design', desc: 'Creating tailored solution architecture and roadmap' },
                  { step: '03', title: 'Development & Testing', desc: 'Agile development with rigorous quality assurance' },
                  { step: '04', title: 'Deployment & Support', desc: 'Smooth implementation and ongoing maintenance' }
                ].map((phase, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {phase.step}
                    </div>
                    <div className="pt-1">
                      <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors">{phase.title}</h4>
                      <p className="text-sm text-slate-400">{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '150+', label: 'Projects Completed', sublabel: 'Across 6 industries' },
                { value: '98%', label: 'Client Retention', sublabel: 'Long-term partnerships' },
                { value: '35+', label: 'Technology Experts', sublabel: 'Dedicated team members' },
                { value: '15+', label: 'Countries Served', sublabel: 'Global footprint' }
              ].map((stat, i) => (
                <div key={i} className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 text-center">
                  <div className="text-4xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="font-medium text-cyan-400">{stat.label}</div>
                  <div className="text-xs text-slate-400 mt-1">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Clean with visible pattern */}
      <section id="contact" className="py-24 relative overflow-hidden">
        {/* Visible Pattern Background */}
        <div 
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `url('/bg-pattern.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-slate-50/90" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <span className="text-sm font-semibold text-cyan-600 uppercase tracking-wider">Get In Touch</span>
                <h2 className="mt-3 text-4xl sm:text-5xl font-bold text-slate-900">
                  Let&apos;s Build Something Amazing Together
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  Ready to transform your organization with intelligent technology? Contact us to discuss your project requirements.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Mail size={22} className="text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Email Us</h4>
                    <p className="text-slate-600">info@epigatersolutions.com</p>
                    <p className="text-sm text-slate-500">We respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <Phone size={22} className="text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Call Us</h4>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-slate-500">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white/80 backdrop-blur-sm rounded-2xl border border-slate-100 shadow-sm">
                  <div className="p-3 bg-white rounded-xl shadow-sm">
                    <MapPin size={22} className="text-cyan-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Visit Us</h4>
                    <p className="text-slate-600">123 Innovation Drive, Tech Hub</p>
                    <p className="text-sm text-slate-500">San Francisco, CA 94105</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-slate-200">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all bg-white/80"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all bg-white/80"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all bg-white/80"
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Company</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all bg-white/80"
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Service Interest</label>
                  <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all bg-white/80">
                    <option>Select a service...</option>
                    <option>AI & Machine Learning</option>
                    <option>Enterprise Software</option>
                    <option>Cybersecurity</option>
                    <option>Cloud Solutions</option>
                    <option>Smart Energy</option>
                    <option>Industrial Automation</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                  <textarea 
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all resize-none bg-white/80"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-slate-400/25 transition-all duration-300 flex items-center justify-center gap-2 group"
                >
                  Send Message
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="Epigater Solutions" className="h-12 w-auto brightness-0 invert" />
                <div>
                  <span className="text-xl font-bold">EPIGATER</span>
                  <span className="block text-xs text-slate-400 tracking-wider">SOLUTIONS</span>
                </div>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed">
                Intelligence Without Limits. Transforming organizations through AI-driven technology solutions that enable efficient, secure, and sustainable operations.
              </p>
              <div className="flex gap-4 mt-6">
                {['twitter', 'linkedin', 'github'].map((social) => (
                  <a 
                    key={social}
                    href="#" 
                    className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors"
                  >
                    <Globe size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-3 text-slate-400">
                {['AI & Machine Learning', 'Enterprise Software', 'Cybersecurity', 'Cloud Solutions', 'Smart Energy', 'Industrial Automation'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-cyan-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-slate-400">
                {['About Us', 'Careers', 'News & Insights', 'Contact', 'Privacy Policy', 'Terms of Service'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-cyan-400 transition-colors">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 Epigater Solutions. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Intelligence Without Limits
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Additional Icons
function CloudIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  )
}
