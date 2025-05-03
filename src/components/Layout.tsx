import ScrollToTopButton from './ScrollToTopButton';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* ... existing code ... */}
      {children}
      <ScrollToTopButton />
    </div>
  );
};

export default Layout;