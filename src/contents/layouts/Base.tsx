import React from 'react';
import Footer from '../top/Footer';
import BottomNav from '../top/navigation/BottomNav';
import SideNav from '../top/navigation/SideNav';

const relative100 = { height: '100%', width: '100%', position: 'relative' } as const;
const Base: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={relative100}>
      <main className="is-flex" style={{ height: '100vh', width: '100%', overflow: 'auto' }}>
        <div className="is-hidden-mobile">
          <SideNav />
        </div>
        <div style={relative100}>{children}</div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Base;
