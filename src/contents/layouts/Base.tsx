import React from 'react';
import BottomNav from '../top/BottomNav';
import Footer from '../top/Footer';
import SideNav from '../top/SideNav';

const Base: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <main className="is-flex" style={{ minHeight: '100vh' }}>
        <div className="is-hidden-mobile">
          <SideNav />
        </div>
        <div>{children}</div>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default Base;
