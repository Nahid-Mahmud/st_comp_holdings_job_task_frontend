import AllServicesHeader from '@/components/all-services/AllServicesHeader';

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <AllServicesHeader />
      {children}
    </div>
  );
}
