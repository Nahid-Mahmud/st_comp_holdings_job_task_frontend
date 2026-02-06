import AllServicesHeader from '@/components/all-services/AllServicesHeader';

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen ">
      <AllServicesHeader />
      {children}
    </div>
  );
}
