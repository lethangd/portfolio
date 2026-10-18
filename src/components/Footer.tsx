import React from 'react';

const Footer: React.FC = () => (
  <footer className="relative border-t border-white/10">
    <div className="page-x flex flex-wrap justify-between gap-4 py-7 text-[13px] text-muted">
      <span>© {new Date().getFullYear()} Lê Minh Thắng</span>
      <span className="font-serif text-base italic">Written under the stars of Hà Nội</span>
    </div>
  </footer>
);

export default Footer;
