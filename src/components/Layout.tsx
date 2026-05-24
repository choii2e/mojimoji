import BottomNav from "./BottomNav";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="pb-16">
      {children}
      <BottomNav />
    </div>
  );
}
