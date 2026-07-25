'use client'

import { useState, useEffect } from 'react'
import { 
  Brain, 
  Cpu, 
  Shield, 
  Sun, 
  Moon,
  Factory, 
  Globe, 
  ArrowRight, 
  ArrowUp,
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
  const [isDark, setIsDark] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('epigater-theme')
    if (savedTheme) {
      setIsDark(savedTheme === 'dark')
    } else {
      setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches)
    }
  }, [])

  useEffect(() => {
    // Save preference and update document class
    localStorage.setItem('epigater-theme', isDark ? 'dark' : 'light')
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDark])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 400)
      
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

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div 
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: "url('/bg-pattern.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Navigation */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? (isDark ? 'bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20' : 'bg-white/95 backdrop-blur-md shadow-lg shadow-slate-200/20')
          : 'bg-transparent'
      }`}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="Epigater Solutions" className="h-12 w-auto" />
              <div className="hidden sm:block">
                <span className={`text-xl font-bold ${isDark ? 'bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent' : 'bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent'}`}>
                  EPIGATER
                </span>
                <span className={`block text-xs font-medium tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>SOLUTIONS</span>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
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
                    activeSection === item.id 
                      ? (isDark ? 'text-white' : 'text-slate-900') 
                      : (isDark ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900')
                  }`}
                >
                  {item.label}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-300 ${
                    activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </button>
              ))}
              
              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2.5 rounded-xl transition-all duration-300 ${
                  isDark 
                    ? 'bg-slate-800 hover:bg-slate-700 text-yellow-400 hover:text-yellow-300' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
              <button 
                onClick={() => scrollToSection('contact')}
                className="px-5 py-2.5 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-slate-400/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started
              </button>
            </div>

            <div className="flex md:hidden items-center gap-2">
              {/* Mobile Theme Toggle */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-colors ${
                  isDark ? 'text-yellow-400' : 'text-slate-600'
                }`}
                aria-label="Toggle theme"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button 
                className={`p-2 rounded-lg ${isDark ? 'hover:bg-slate-800' : 'hover:bg-slate-100'}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t shadow-xl ${isDark ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="px-4 py-6 space-y-4">
              {['home', 'about', 'services', 'divisions', 'why-us', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`block w-full text-left px-4 py-3 rounded-xl font-medium capitalize transition-colors ${
                    isDark 
                      ? 'text-slate-300 hover:bg-slate-800 hover:text-white' 
                      : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  {item.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20">
        {/* Overlay for readability - changes based on theme */}
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-br from-slate-900/85 via-slate-900/80 to-slate-800/85' 
            : 'bg-gradient-to-br from-white/70 via-white/65 to-cyan-50/50'
        }`} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm border rounded-full shadow-sm ${
                isDark ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-slate-200'
              }`}>
                <Sparkles size={16} className="text-cyan-500" />
                <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>Welcome to Epigater</span>
              </div>
              
              {/* HEADLINE - Exactly 2 Lines */}
              <h1 className="text-4xl sm:text-5xl lg:text-[3rem] xl:text-[3.25rem] font-bold leading-[1.2]">
                <span className={`${isDark ? 'bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-300' : 'bg-gradient-to-r from-cyan-700 via-blue-700 to-slate-800'} bg-clip-text text-transparent whitespace-nowrap pr-2`}>
                  Intelligence Without
                </span>
                <br />
                <span className={isDark ? 'text-white' : 'text-slate-900'}>Limits</span>
              </h1>
              
              <p className={`text-lg leading-relaxed max-w-xl ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                AI-driven solutions that empower organizations to operate more efficiently, securely, and sustainably.
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
                  className={`inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold border transition-all duration-300 hover:-translate-y-1 ${
                    isDark 
                      ? 'bg-slate-800 text-white border-slate-600 hover:border-slate-500 hover:bg-slate-700' 
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300 hover:shadow-lg'
                  }`}
                >
                  Learn More
                </button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>150+</div>
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Projects Delivered</div>
                </div>
                <div className={`w-px h-12 ${isDark ? 'bg-slate-600' : 'bg-slate-200'}`} />
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>98%</div>
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Client Satisfaction</div>
                </div>
                <div className={`w-px h-12 ${isDark ? 'bg-slate-600' : 'bg-slate-200'}`} />
                <div className="text-center">
                  <div className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>24/7</div>
                  <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>Support Available</div>
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
              <div className={`absolute top-10 -left-10 p-4 backdrop-blur-sm rounded-2xl shadow-xl animate-bounce ${isDark ? 'bg-slate-800/95 shadow-black/30' : 'bg-white/95 shadow-slate-200/50'}`} style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isDark ? 'bg-emerald-900/50' : 'bg-emerald-100'}`}>
                    <TrendingUp size={20} className="text-emerald-500" />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Growth Rate</div>
                    <div className="text-lg font-bold text-emerald-500">+47%</div>
                  </div>
                </div>
              </div>

              <div className={`absolute bottom-20 -right-5 p-4 backdrop-blur-sm rounded-2xl shadow-xl animate-bounce ${isDark ? 'bg-slate-800/95 shadow-black/30' : 'bg-white/95 shadow-slate-200/50'}`} style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isDark ? 'bg-cyan-900/50' : 'bg-cyan-100'}`}>
                    <Brain size={20} className="text-cyan-500" />
                  </div>
                  <div>
                    <div className={`text-sm font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>AI Powered</div>
                    <div className="text-lg font-bold text-cyan-500">Solutions</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-slate-900/80 via-slate-900/85 to-slate-800/90' 
            : 'bg-gradient-to-b from-white/70 via-white/75 to-slate-50/85'
        }`} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className={`absolute -inset-4 rounded-3xl blur-2xl opacity-80 ${isDark ? 'bg-gradient-to-br from-slate-700 to-cyan-900/30' : 'bg-gradient-to-br from-slate-100 to-cyan-50'}`} />
              <div className={`relative rounded-3xl p-8 sm:p-12 text-white ${isDark ? 'bg-gradient-to-br from-slate-800 to-slate-900' : 'bg-gradient-to-br from-slate-800 to-slate-900'}`}>
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
                <span className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Who We Are</span>
                <h2 className={`mt-3 text-4xl sm:text-5xl font-bold leading-tight ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  About Epigater Solutions
                </h2>
              </div>

              <div className={`space-y-4 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <p>
                  <strong className={isDark ? 'text-white' : 'text-slate-900'}>Epigater Solutions</strong> is an AI-driven technology, engineering and international trading company focused on developing, integrating and implementing intelligent systems that enable organizations to operate more efficiently, securely and sustainably.
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
                  <div key={i} className={`p-4 backdrop-blur-sm rounded-2xl border shadow-sm ${
                    isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-100'
                  }`}>
                    <div className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{stat.value}</div>
                    <div className={`text-sm ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-slate-900/80 via-slate-900/85 to-slate-800/88' 
            : 'bg-gradient-to-b from-slate-50/75 via-white/82 to-slate-50/78'
        }`} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium shadow-sm ${
              isDark ? 'bg-slate-800/90 border-slate-700 text-slate-200' : 'bg-white border-slate-200 text-slate-700'
            }`}>
              <Zap size={16} className="text-cyan-500" />
              Our Services
            </span>
            <h2 className={`mt-6 text-4xl sm:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Comprehensive Technology Solutions
            </h2>
            <p className={`mt-4 text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
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
                className={`group relative backdrop-blur-sm rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${
                  isDark 
                    ? 'bg-slate-800/80 border border-slate-700 hover:border-slate-600 hover:shadow-xl hover:shadow-black/30' 
                    : 'bg-white/90 border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50'
                }`}
              >
                <div className={`absolute inset-0 rounded-3xl transition-all duration-500 opacity-0 group-hover:opacity-100 ${
                  isDark 
                    ? 'bg-gradient-to-br from-transparent to-cyan-900/20' 
                    : 'bg-gradient-to-br from-transparent to-slate-50/50'
                }`} />
                
                <div className="relative">
                  <div className={`inline-flex p-4 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300 ${
                    service.color === 'cyan' ? (isDark ? 'bg-cyan-900/40' : 'bg-cyan-100') :
                    service.color === 'slate' ? (isDark ? 'bg-slate-700' : 'bg-slate-100') :
                    service.color === 'emerald' ? (isDark ? 'bg-emerald-900/40' : 'bg-emerald-100') :
                    service.color === 'blue' ? (isDark ? 'bg-blue-900/40' : 'bg-blue-100') :
                    service.color === 'amber' ? (isDark ? 'bg-amber-900/40' : 'bg-amber-100') :
                    (isDark ? 'bg-violet-900/40' : 'bg-violet-100')
                  }`}>
                    <service.icon size={28} className={
                      service.color === 'cyan' ? 'text-cyan-500' :
                      service.color === 'slate' ? (isDark ? 'text-slate-300' : 'text-slate-700') :
                      service.color === 'emerald' ? 'text-emerald-500' :
                      service.color === 'blue' ? 'text-blue-500' :
                      service.color === 'amber' ? 'text-amber-500' :
                      'text-violet-500'
                    } />
                  </div>
                  
                  <h3 className={`text-xl font-bold mb-3 ${isDark ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                  <p className={`mb-6 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{service.description}</p>
                  
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className={`flex items-center gap-2 text-sm ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
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

      {/* Business Divisions */}
      <section id="divisions" className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-slate-900/82 via-slate-900/85 to-slate-800/88' 
            : 'bg-gradient-to-b from-white/72 via-white/78 to-slate-50/82'
        }`} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium ${
              isDark ? 'bg-slate-800/90 border-slate-700 text-slate-200' : 'bg-slate-100 border-slate-200 text-slate-700'
            }`}>
              <Layers size={16} />
              Business Divisions
            </span>
            <h2 className={`mt-6 text-4xl sm:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              Six Pillars of Excellence
            </h2>
            <p className={`mt-4 text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              Our integrated divisions work together to deliver comprehensive solutions across technology domains
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                bgColor: isDark ? 'bg-violet-900/30' : 'bg-violet-50',
                borderColor: isDark ? 'border-violet-800' : 'border-violet-200',
                textColor: isDark ? 'text-violet-400' : 'text-violet-700',
                title: 'Artificial Intelligence Division',
                description: 'Developing and deploying AI models, machine learning pipelines, and intelligent automation solutions.',
                capabilities: ['Deep Learning', 'NLP & Conversational AI', 'Computer Vision', 'MLOps & Deployment']
              },
              {
                icon: Cpu,
                bgColor: isDark ? 'bg-slate-800' : 'bg-slate-100',
                borderColor: isDark ? 'border-slate-600' : 'border-slate-300',
                textColor: isDark ? 'text-slate-300' : 'text-slate-700',
                title: 'Enterprise Software Division',
                description: 'Building scalable software platforms, ERP systems, and business applications that drive operational excellence.',
                capabilities: ['Enterprise Applications', 'System Integration', 'API Development', 'Quality Assurance']
              },
              {
                icon: Globe,
                bgColor: isDark ? 'bg-cyan-900/30' : 'bg-cyan-50',
                borderColor: isDark ? 'border-cyan-800' : 'border-cyan-200',
                textColor: isDark ? 'text-cyan-400' : 'text-cyan-700',
                title: 'Technology Integration Division',
                description: 'Seamlessly connecting disparate systems, legacy modernization, and creating unified technology ecosystems.',
                capabilities: ['System Integration', 'Legacy Modernization', 'Data Migration', 'Infrastructure Planning']
              },
              {
                icon: Sun,
                bgColor: isDark ? 'bg-amber-900/30' : 'bg-amber-50',
                borderColor: isDark ? 'border-amber-800' : 'border-amber-200',
                textColor: isDark ? 'text-amber-400' : 'text-amber-700',
                title: 'Smart Energy Division',
                description: 'Delivering IoT-based energy monitoring, renewable energy solutions, and smart grid technologies.',
                capabilities: ['Energy Monitoring', 'Solar & Wind Integration', 'Smart Metering', 'Sustainability Consulting']
              },
              {
                icon: Factory,
                bgColor: isDark ? 'bg-emerald-900/30' : 'bg-emerald-50',
                borderColor: isDark ? 'border-emerald-800' : 'border-emerald-200',
                textColor: isDark ? 'text-emerald-400' : 'text-emerald-700',
                title: 'Smart Manufacturing Division',
                description: 'Implementing Industry 4.0 technologies, production optimization, and connected factory solutions.',
                capabilities: ['IIoT Implementation', 'Production Analytics', 'Digital Twin', 'Quality Automation']
              },
              {
                icon: BarChart3,
                bgColor: isDark ? 'bg-rose-900/30' : 'bg-rose-50',
                borderColor: isDark ? 'border-rose-800' : 'border-rose-200',
                textColor: isDark ? 'text-rose-400' : 'text-rose-700',
                title: 'International Trading Division',
                description: 'Facilitating global technology trade, equipment sourcing, and international market expansion services.',
                capabilities: ['Equipment Sourcing', 'Import/Export', 'Supply Chain', 'Market Expansion']
              }
            ].map((division, index) => (
              <div 
                key={index}
                className={`group relative ${division.bgColor} rounded-3xl p-8 border hover:shadow-xl transition-all duration-300 cursor-pointer backdrop-blur-sm ${division.borderColor}`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`p-3 rounded-xl shadow-sm ${isDark ? 'bg-slate-800' : 'bg-white'}`}>
                    <division.icon size={24} className={division.textColor} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>{division.title}</h3>
                  </div>
                </div>
                
                <p className={`text-sm leading-relaxed mb-4 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{division.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {division.capabilities.map((cap, i) => (
                    <span 
                      key={i}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark ? 'bg-slate-800/80 text-slate-300' : 'bg-white/80 text-slate-700'
                      }`}
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

      {/* Why Choose Us - Dark section with dot pattern */}
      <section id="why-us" className="py-24 bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Visible Dot Pattern */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
        
        {/* Network Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.06]"
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

      {/* Contact Section - WITH UPDATED INFO */}
      <section id="contact" className="py-24 relative overflow-hidden">
        <div className={`absolute inset-0 ${
          isDark 
            ? 'bg-gradient-to-b from-slate-900/82 via-slate-900/85 to-slate-800/88' 
            : 'bg-gradient-to-b from-white/72 via-white/78 to-slate-50/82'
        }`} />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div>
                <span className={`text-sm font-semibold uppercase tracking-wider ${isDark ? 'text-cyan-400' : 'text-cyan-600'}`}>Get In Touch</span>
                <h2 className={`mt-3 text-4xl sm:text-5xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                  Let&apos;s Build Something Amazing Together
                </h2>
                <p className={`mt-4 text-lg ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                  Ready to transform your organization with intelligent technology? Contact us to discuss your project requirements.
                </p>
              </div>

              <div className="space-y-6">
                {/* Email */}
                <div className={`flex items-start gap-4 p-6 backdrop-blur-sm rounded-2xl border shadow-sm ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-100'
                }`}>
                  <div className={`p-3 rounded-xl shadow-sm ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
                    <Mail size={22} className="text-cyan-500" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Email Us</h4>
                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>contact@epigater.com</p>
                    <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>We respond within 24 hours</p>
                  </div>
                </div>

                {/* Phone */}
                <div className={`flex items-start gap-4 p-6 backdrop-blur-sm rounded-2xl border shadow-sm ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-100'
                }`}>
                  <div className={`p-3 rounded-xl shadow-sm ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
                    <Phone size={22} className="text-cyan-500" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Call Us</h4>
                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>+251 966 131 415</p>
                    <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Mon-Fri, 9am-6pm EAT</p>
                  </div>
                </div>

                {/* Address */}
                <div className={`flex items-start gap-4 p-6 backdrop-blur-sm rounded-2xl border shadow-sm ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-100'
                }`}>
                  <div className={`p-3 rounded-xl shadow-sm ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
                    <MapPin size={22} className="text-cyan-500" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Visit Us</h4>
                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Bole, Addis Ababa, Ethiopia</p>
                    <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Main Office Location</p>
                  </div>
                </div>

                {/* Website */}
                <div className={`flex items-start gap-4 p-6 backdrop-blur-sm rounded-2xl border shadow-sm ${
                  isDark ? 'bg-slate-800/80 border-slate-700' : 'bg-white/80 border-slate-100'
                }`}>
                  <div className={`p-3 rounded-xl shadow-sm ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
                    <Globe size={22} className="text-cyan-500" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>Website</h4>
                    <a href="https://epigater.com" target="_blank" rel="noopener noreferrer" className="text-cyan-500 hover:text-cyan-400 transition-colors">
                      epigater.com
                    </a>
                    <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Learn more about us online</p>
                  </div>
                </div>

                {/* General Manager Info */}
                <div className={`flex items-start gap-4 p-6 rounded-2xl border ${
                  isDark 
                    ? 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border-cyan-800' 
                    : 'bg-gradient-to-r from-cyan-50 to-blue-50 border-cyan-100'
                }`}>
                  <div className={`p-3 rounded-xl shadow-sm ${isDark ? 'bg-slate-700' : 'bg-white'}`}>
                    <Users size={22} className="text-cyan-500" />
                  </div>
                  <div>
                    <h4 className={`font-semibold ${isDark ? 'text-white' : 'text-slate-900'}`}>General Manager</h4>
                    <p className={`${isDark ? 'text-slate-300' : 'text-slate-600'}`}>Hailay Weldegebriel</p>
                    <p className={`text-sm ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>Direct contact available upon request</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`backdrop-blur-sm rounded-3xl p-8 sm:p-10 border ${
              isDark 
                ? 'bg-slate-800/90 shadow-xl shadow-black/20 border-slate-700' 
                : 'bg-white/90 shadow-xl shadow-slate-200/50 border-slate-200'
            }`}>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>First Name</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        isDark 
                          ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500' 
                          : 'bg-white/80 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                      }`}
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Last Name</label>
                    <input 
                      type="text" 
                      className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                        isDark 
                          ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500' 
                          : 'bg-white/80 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                      }`}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Email Address</label>
                  <input 
                    type="email" 
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      isDark 
                        ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500' 
                        : 'bg-white/80 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                    }`}
                    placeholder="john@company.com"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Company</label>
                  <input 
                    type="text" 
                    className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                      isDark 
                        ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500' 
                        : 'bg-white/80 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                    }`}
                    placeholder="Your Company Name"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Service Interest</label>
                  <select className={`w-full px-4 py-3 rounded-xl border outline-none transition-all ${
                    isDark 
                      ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white' 
                      : 'bg-white/80 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                  }`}>
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
                  <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>Message</label>
                  <textarea 
                    rows={4}
                    className={`w-full px-4 py-3 rounded-xl border outline-none resize-none transition-all ${
                      isDark 
                        ? 'bg-slate-700/50 border-slate-600 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder:text-slate-500' 
                        : 'bg-white/80 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20'
                    }`}
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

      {/* Footer - Updated with correct info */}
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
              
              {/* Footer Contact Info */}
              <div className="mt-6 space-y-2 text-sm text-slate-400">
                <p><strong className="text-white">Location:</strong> Bole, Addis Ababa, Ethiopia</p>
                <p><strong className="text-white">Phone:</strong> +251 966 131 415</p>
                <p><strong className="text-white">Email:</strong> contact@epigater.com</p>
                <p><strong className="text-white">Website:</strong> <a href="https://epigater.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">epigater.com</a></p>
              </div>
              
              <div className="flex gap-4 mt-6">
                <a href="https://epigater.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                  <Globe size={18} />
                </a>
                <a href="mailto:contact@epigater.com" className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                  <Mail size={18} />
                </a>
                <a href="tel:+251966131415" className="w-10 h-10 bg-slate-800 hover:bg-cyan-600 rounded-lg flex items-center justify-center transition-colors">
                  <Phone size={18} />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-3 text-slate-400">
                {[
                  { label: 'AI & Machine Learning', id: 'services' },
                  { label: 'Enterprise Software', id: 'services' },
                  { label: 'Cybersecurity', id: 'services' },
                  { label: 'Cloud Solutions', id: 'services' },
                  { label: 'Smart Energy', id: 'services' },
                  { label: 'Industrial Automation', id: 'services' }
                ].map((item) => (
                  <li key={item.label}>
                    <a 
                      href={`#${item.id}`}
                      onClick={(e) => { e.preventDefault(); scrollToSection(item.id); }}
                      className="hover:text-cyan-400 transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3 text-slate-400">
                {[
                  { label: 'About Us', id: 'about' },
                  { label: 'Divisions', id: 'divisions' },
                  { label: 'Why Choose Us', id: 'why-us' },
                  { label: 'Contact', id: 'contact' },
                  { label: 'Careers', external: '#' },
                  { label: 'Privacy Policy', external: '#' }
                ].map((item) => (
                  <li key={item.label}>
                    {'id' in item && item.id ? (
                      <a 
                        href={`#${item.id}`}
                        onClick={(e) => { e.preventDefault(); scrollToSection(item.id!); }}
                        className="hover:text-cyan-400 transition-colors"
                      >
                        {item.label}
                      </a>
                    ) : (
                      <a href={item.external} className="hover:text-cyan-400 transition-colors">{item.label}</a>
                    )}
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
              Hailay Weldegebriel, General Manager
            </p>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform ${
          showBackToTop 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12 pointer-events-none'
        } ${
          isDark 
            ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/30' 
            : 'bg-slate-800 hover:bg-slate-700 text-white shadow-slate-400/30'
        } hover:scale-110 group`}
        aria-label="Back to top"
      >
        <ArrowUp size={22} className="group-hover:-translate-y-0.5 transition-transform" />
        
        {/* Tooltip */}
        <span className={`absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none ${
          isDark ? 'bg-slate-700 text-white' : 'bg-slate-800 text-white'
        }`}>
          Back to top
        </span>
      </button>
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
