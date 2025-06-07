'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  User, 
  CreditCard, 
  Settings, 
  LogOut,
  Zap,
  LogIn
} from 'lucide-react';
import Button from '@/components/ui/Button';
import { useDemoSession } from '@/components/providers/DemoAuthProvider';

const Header = () => {
  const { data: session, status, signIn, signOut } = useDemoSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', href: '/' },
    { name: 'Image', href: '/image' },
    { name: 'Video', href: '/video' },
    { name: 'Audio', href: '/audio' },
    { name: '3D', href: '/3d' },
    { name: 'Text', href: '/text' },
    { name: 'Workflows', href: '/workflows' },
  ];

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-electric-blue to-neon-cyan rounded-lg flex items-center justify-center shadow-glow">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Hi-API</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-electric-blue transition-colors duration-200 font-medium"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {status === 'loading' ? (
              <div className="w-8 h-8 animate-pulse bg-gray-200 rounded-full"></div>
            ) : session ? (
              <>
                {/* Credits Display */}
                <motion.div 
                  className="hidden sm:flex items-center space-x-2 glass px-3 py-1 rounded-full"
                  whileHover={{ scale: 1.05 }}
                >
                  <CreditCard className="w-4 h-4 text-electric-blue" />
                  <span className="text-sm font-semibold text-gray-700">
                    {session.user?.credits?.toFixed(0) || '0'}
                  </span>
                  <span className="text-xs text-gray-500">credits</span>
                </motion.div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <motion.button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 glass p-2 rounded-full hover:shadow-glow transition-all duration-200"
                    whileTap={{ scale: 0.95 }}
                  >
                    {session.user?.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User'}
                        width={32}
                        height={32}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gradient-to-br from-iridescent-purple to-electric-blue rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-48 glass border border-white/20 rounded-lg shadow-lg py-1"
                    >
                      <div className="px-4 py-2 border-b border-white/20">
                        <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                        <p className="text-xs text-gray-600">{session.user?.email}</p>
                        <p className="text-xs text-electric-blue capitalize">{session.user?.tier || 'basic'} tier</p>
                      </div>
                      <a href="/profile" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-white/10 transition-colors">
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </a>
                      <a href="/credits" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-white/10 transition-colors">
                        <CreditCard className="w-4 h-4 mr-3" />
                        Credits
                      </a>
                      <a href="/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-white/10 transition-colors">
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </a>
                      <hr className="my-1 border-white/20" />
                      <button 
                        onClick={() => signOut()}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-white/10 transition-colors"
                      >
                        <LogOut className="w-4 h-4 mr-3" />
                        Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            ) : (
              <Button
                variant="primary"
                icon={<LogIn className="w-4 h-4" />}
                onClick={() => signIn()}
              >
                Demo Sign In
              </Button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden glass p-2 rounded-lg"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-gray-700" />
              ) : (
                <Menu className="w-5 h-5 text-gray-700" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/20 py-4"
          >
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 hover:text-electric-blue hover:bg-white/10 rounded-lg transition-all duration-200"
                  whileHover={{ x: 10 }}
                >
                  {item.name}
                </motion.a>
              ))}
              {!session && (
                <div className="px-4 py-2">
                  <Button
                    variant="primary"
                    icon={<LogIn className="w-4 h-4" />}
                    onClick={() => signIn()}
                    className="w-full"
                  >
                    Demo Sign In
                  </Button>
                </div>
              )}
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;